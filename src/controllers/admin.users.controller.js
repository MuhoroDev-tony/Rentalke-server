const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
    try {
        // Fetching only firstName, lastName, and email for each user
        const users = await prisma.user.findMany({
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone:true,
                role:true,
                position:true,
                department:true,
                profileImage:true,
                status:true,
                lastLogin:true,
                createdAt:true,
                updatedAt:true
                
            }
        });

        res.json({
            success: true,
            status: 'OK',
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 'Error',
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};
