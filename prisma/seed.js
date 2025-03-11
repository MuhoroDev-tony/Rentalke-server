// seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const seedAdmin = async () => {
  try {
    // Define the admin credentials
    const email = 'fullstackdev26m@gmail.com';
    const password = 'Admin@13'; // plaintext password to be hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the admin already exists in the database
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('Admin already exists.');
      return;
    }

    // Create the admin user in the database
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'Anthony',
        lastName: 'Muhoro',
        phone: '1234567890',
        role: 'ADMIN', // Ensure this user is an admin
        position: "CEO",
        department: "IT",
        status: "ACTIVE",
        profileImage: "https://www.canva.com/design/DAGhWlY93Qw/UGcBqkt4Ey1Tp9ScqdU9MA/edit?utm_content=DAGhWlY93Qw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
      },
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seed function
seedAdmin();
