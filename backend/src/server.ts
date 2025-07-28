import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Middleware
 // CORS Configuration - Allow requests from React app
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Types for API responses
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface DumpsterTypeResponse {
  id: number;
  sizeCubicYards: number;
  lengthFt: number;
  widthFt: number;
  heightFt: number;
}

// Routes
app.get('/api/dumpster-types', async (req: Request, res: Response<ApiResponse<DumpsterTypeResponse[]>>) => {
  try {
    const dumpsterTypes = await prisma.dumpsterType.findMany({
      orderBy: { sizeCubicYards: 'asc' },
    });

    // Convert Decimal fields to numbers for JSON response
    const formattedData: DumpsterTypeResponse[] = dumpsterTypes.map((dt: any) => ({
      id: dt.id,
      sizeCubicYards: dt.sizeCubicYards,
      lengthFt: parseFloat(dt.lengthFt.toString()),
      widthFt: parseFloat(dt.widthFt.toString()),
      heightFt: parseFloat(dt.heightFt.toString()),
    }));

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error('Error fetching dumpster types:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dumpster types',
    });
  }
});

app.get('/api/material-types', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const materialTypes = await prisma.materialType.findMany({
      orderBy: { name: 'asc' },
    });

    res.json({
      success: true,
      data: materialTypes,
    });
  } catch (error) {
    console.error('Error fetching material types:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch material types',
    });
  }
});

app.get('/api/service-areas', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const serviceAreas = await prisma.serviceArea.findMany({
      where: { isActive: true },
      orderBy: [{ state: 'asc' }, { city: 'asc' }],
    });

    res.json({
      success: true,
      data: serviceAreas,
    });
  } catch (error) {
    console.error('Error fetching service areas:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service areas',
    });
  }
});

app.get('/health', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    data: {
      message: 'Gummy API is running! 🍬',
      timestamp: new Date().toISOString(),
    },
  });
});

// Start server
app.listen(port, () => {
  console.log(`🍬 Gummy API server running on port ${port}`);
  console.log(`🔗 Health check: http://localhost:${port}/health`);
  console.log(`📊 Dumpster types: http://localhost:${port}/api/dumpster-types`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});