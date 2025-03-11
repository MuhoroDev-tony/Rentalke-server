//admin crud users 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { role, position } = req.user; // Get the current user's role and position
        const newUserData = req.body;

        // Check if the creator has permission to create users
        if (role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can create users'
            });
        }

        // CTO specific restrictions
        if (position === 'CTO') {
            // CTO cannot create CEO
            if (newUserData.position === 'CEO') {
                return res.status(403).json({
                    success: false,
                    message: 'CTO cannot create CEO accounts'
                });
            }

            // CTO can only create ADMIN, CLIENT, and MANAGER roles
            if (!['ADMIN', 'CLIENT', 'MANAGER'].includes(newUserData.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'CTO can only create ADMIN, CLIENT, and MANAGER roles'
                });
            }
        }

        // Hash password if provided
        if (newUserData.password) {
            const salt = await bcrypt.genSalt(10);
            newUserData.password = await bcrypt.hash(newUserData.password, salt);
        }

        // Create the new user
        const user = await prisma.user.create({
            data: {
                ...newUserData,
                status: 'ACTIVE' // Set default status
            }
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                position: user.position,
                department: user.department,
                status: user.status
            }
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
};
