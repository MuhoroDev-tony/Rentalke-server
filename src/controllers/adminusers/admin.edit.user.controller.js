const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.editUser = async (req, res) => {
    try {
        const { id: targetUserId } = req.params;
        const { role, position, department } = req.user; // Get the current user's role and position
        const updateData = req.body;

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
            // CTO cannot edit admins
            if (targetUser.role === 'ADMIN') {
                return res.status(403).json({
                    success: false,
                    message: 'CTO cannot edit admin users'
                });
            }
        }

        // CEO restrictions
        if (position === 'CEO') {
            // CEO cannot edit another CEO unless they are in IT department
            if (targetUser.position === 'CEO' && department !== 'IT') {
                return res.status(403).json({
                    success: false,
                    message: 'Only IT department CEOs can edit other CEOs'
                });
            }
        }

        // Hash password if it's being updated
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        // Perform the update
        const updatedUser = await prisma.user.update({
            where: { id: targetUserId },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                position: true,
                department: true,
                status: true,
                updatedAt: true
            }
        });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
        });
    }
};