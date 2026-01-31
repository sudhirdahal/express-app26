// Mock data (in a real app, this would be a Database call)
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Exporting individual logic blocks        
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users }
    });
};

exports.getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: { user } });
};