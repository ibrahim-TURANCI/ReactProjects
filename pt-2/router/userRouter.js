import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pt',
    password: 'qwe123',
    port: 5380, // PostgreSQL default port
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const users = result.rows;
        client.release();
        res.json(users);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = result.rows[0];
        client.release();
        res.json(user);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new user
router.post('/', async (req, res) => {
    const { name, surname, tc, mail, tel, isAdmin, password } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO users (name, surname, tc, mail, tel, isAdmin, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, surname, tc, mail, tel, isAdmin, password]);
        const newUser = result.rows[0];
        client.release();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, surname, tc, mail, tel, isAdmin, password } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE users SET name = $1, surname = $2, tc = $3, mail = $4, tel = $5, isAdmin = $6, password = $7 WHERE id = $8 RETURNING *', [name, surname, tc, mail, tel, isAdmin, password, userId]);
        const updatedUser = result.rows[0];
        client.release();
        res.json(updatedUser);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const client = await pool.connect();
        await client.query('DELETE FROM users WHERE id = $1', [userId]);
        client.release();
        res.status(204).send();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
