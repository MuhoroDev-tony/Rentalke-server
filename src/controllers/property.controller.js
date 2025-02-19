const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Estate Controllers
exports.createEstate = async (req, res) => {
  try {
    const managerId = req.user.id; // From auth middleware
    const estateData = { ...req.body, managerId };

    const estate = await prisma.estate.create({
      data: estateData,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Estate created successfully',
      estate
    });
  } catch (error) {
    console.error('Create estate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create estate',
      error: error.message
    });
  }
};

exports.getManagerEstates = async (req, res) => {
  try {
    const managerId = req.user.id;
    const estates = await prisma.estate.findMany({
      where: { managerId },
      include: {
        buildings: {
          include: {
            rentalUnits: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      estates
    });
  } catch (error) {
    console.error('Get estates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get estates',
      error: error.message
    });
  }
};

exports.getAllEstates = async (req, res) => {
  try {
    const estates = await prisma.estate.findMany({
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        buildings: {
          include: {
            rentalUnits: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      estates
    });
  } catch (error) {
    console.error('Get all estates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get estates',
      error: error.message
    });
  }
};

exports.updateEstate = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user.id;
    
    // Verify ownership
    const existingEstate = await prisma.estate.findFirst({
      where: { id, managerId }
    });

    if (!existingEstate) {
      return res.status(404).json({
        success: false,
        message: 'Estate not found or you do not have permission to update it'
      });
    }

    const estate = await prisma.estate.update({
      where: { id },
      data: req.body,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Estate updated successfully',
      estate
    });
  } catch (error) {
    console.error('Update estate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update estate',
      error: error.message
    });
  }
};

exports.deleteEstate = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user.id;

    // Verify ownership
    const existingEstate = await prisma.estate.findFirst({
      where: { id, managerId }
    });

    if (!existingEstate) {
      return res.status(404).json({
        success: false,
        message: 'Estate not found or you do not have permission to delete it'
      });
    }

    await prisma.estate.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Estate deleted successfully'
    });
  } catch (error) {
    console.error('Delete estate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete estate',
      error: error.message
    });
  }
};

// Building Controllers
exports.createBuilding = async (req, res) => {
  try {
    const managerId = req.user.id;
    const buildingData = { ...req.body, managerId };

    // Verify estate ownership
    const estate = await prisma.estate.findFirst({
      where: { 
        id: buildingData.estateId,
        managerId
      }
    });

    if (!estate) {
      return res.status(404).json({
        success: false,
        message: 'Estate not found or you do not have permission to add buildings to it'
      });
    }

    const building = await prisma.building.create({
      data: buildingData,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        estate: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Building created successfully',
      building
    });
  } catch (error) {
    console.error('Create building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create building',
      error: error.message
    });
  }
};

exports.getManagerBuildings = async (req, res) => {
  try {
    const managerId = req.user.id;
    const buildings = await prisma.building.findMany({
      where: { managerId },
      include: {
        estate: true,
        rentalUnits: true
      }
    });

    res.status(200).json({
      success: true,
      buildings
    });
  } catch (error) {
    console.error('Get buildings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get buildings',
      error: error.message
    });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user.id;
    
    // Verify ownership
    const existingBuilding = await prisma.building.findFirst({
      where: { id, managerId }
    });

    if (!existingBuilding) {
      return res.status(404).json({
        success: false,
        message: 'Building not found or you do not have permission to update it'
      });
    }

    const building = await prisma.building.update({
      where: { id },
      data: req.body,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        estate: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Building updated successfully',
      building
    });
  } catch (error) {
    console.error('Update building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update building',
      error: error.message
    });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user.id;

    // Verify ownership
    const existingBuilding = await prisma.building.findFirst({
      where: { id, managerId }
    });

    if (!existingBuilding) {
      return res.status(404).json({
        success: false,
        message: 'Building not found or you do not have permission to delete it'
      });
    }

    await prisma.building.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Building deleted successfully'
    });
  } catch (error) {
    console.error('Delete building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete building',
      error: error.message
    });
  }
};

// Rental Unit Controllers
exports.createRentalUnit = async (req, res) => {
  try {
    const managerId = req.user.id;
    const unitData = { ...req.body, managerId };

    // Verify building ownership
    const building = await prisma.building.findFirst({
      where: { 
        id: unitData.buildingId,
        managerId
      }
    });

    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found or you do not have permission to add units to it'
      });
    }

    const rentalUnit = await prisma.rentalUnit.create({
      data: unitData,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        estate: true,
        building: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Rental unit created successfully',
      rentalUnit
    });
  } catch (error) {
    console.error('Create rental unit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create rental unit',
      error: error.message
    });
  }
};

exports.getManagerRentalUnits = async (req, res) => {
  try {
    const managerId = req.user.id;
    const rentalUnits = await prisma.rentalUnit.findMany({
      where: { managerId },
      include: {
        estate: true,
        building: true
      }
    });

    res.status(200).json({
      success: true,
      rentalUnits
    });
  } catch (error) {
    console.error('Get rental units error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get rental units',
      error: error.message
    });
  }
};

exports.updateRentalUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user.id;
    
    // Verify ownership
    const existingUnit = await prisma.rentalUnit.findFirst({
      where: { id, managerId }
    });

    if (!existingUnit) {
      return res.status(404).json({
        success: false,
        message: 'Rental unit not found or you do not have permission to update it'
      });
    }

    const rentalUnit = await prisma.rentalUnit.update({
      where: { id },
      data: req.body,
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        estate: true,
        building: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Rental unit updated successfully',
      rentalUnit
    });
  } catch (error) {
    console.error('Update rental unit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update rental unit',
      error: error.message
    });
  }
};

exports.deleteRentalUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const managerId = req.user.id;

    // Verify ownership
    const existingUnit = await prisma.rentalUnit.findFirst({
      where: { id, managerId }
    });

    if (!existingUnit) {
      return res.status(404).json({
        success: false,
        message: 'Rental unit not found or you do not have permission to delete it'
      });
    }

    await prisma.rentalUnit.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Rental unit deleted successfully'
    });
  } catch (error) {
    console.error('Delete rental unit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete rental unit',
      error: error.message
    });
  }
};
