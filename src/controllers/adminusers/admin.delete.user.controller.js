const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteUser = async (req, res) => {
    try {
        const { id: targetUserId } = req.params;
        const { role, position, department } = req.user; // Get the current user's role and position

        // Check if the target user exists
        const targetUser = await prisma.user.findUnique({
            where: { id: targetUserId }
        });

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // CTO restrictions
        if (position === 'CTO') {
            // CTO cannot delete admins
            if (targetUser.role === 'ADMIN') {
                return res.status(403).json({
                    success: false,
                    message: 'CTO cannot delete admin users'
                });
            }

            // CTO cannot delete CEO
            if (targetUser.position === 'CEO') {
                return res.status(403).json({
                    success: false,
                    message: 'CTO cannot delete CEO users'
                });
            }
        }

        // CEO restrictions
        if (position === 'CEO') {
            // CEO cannot delete another CEO unless they are in IT department
            if (targetUser.position === 'CEO' && department !== 'IT') {
                return res.status(403).json({
                    success: false,
                    message: 'Only IT department CEOs can delete other CEOs'
                });
            }
        }

        // Soft delete by updating status to DELETED
        const deletedUser = await prisma.user.update({
            where: { id: targetUserId },
            data: {
                status: 'DELETED',
                updatedAt: new Date()
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                position: true,
                status: true
            }
        });

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
};