import { PrismaClient, Prisma } from '../src/generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🍬 Starting Gummy seed...');

  // Seed Dumpster Types
  console.log('📦 Creating dumpster types...');
  const dumpsterTypesData: Prisma.DumpsterTypeCreateInput[] = [
    {
      sizeCubicYards: 10,
      lengthFt: new Decimal(13.0),
      widthFt: new Decimal(8.0),
      heightFt: new Decimal(4.0),
    },
    {
      sizeCubicYards: 15,
      lengthFt: new Decimal(16.0),
      widthFt: new Decimal(8.0),
      heightFt: new Decimal(4.0),
    },
    {
      sizeCubicYards: 20,
      lengthFt: new Decimal(22.0),
      widthFt: new Decimal(8.0),
      heightFt: new Decimal(3.5),
    },
    {
      sizeCubicYards: 30,
      lengthFt: new Decimal(22.0),
      widthFt: new Decimal(8.0),
      heightFt: new Decimal(5.0),
    },
    {
      sizeCubicYards: 40,
      lengthFt: new Decimal(22.0),
      widthFt: new Decimal(8.0),
      heightFt: new Decimal(7.0),
    },
  ];

  const dumpsterTypes = await Promise.all(
    dumpsterTypesData.map(data => 
      prisma.dumpsterType.create({ data })
    )
  );

  // Seed Material Types
  console.log('🏗️ Creating material types...');
  const materialTypesData: Prisma.MaterialTypeCreateInput[] = [
    {
      name: 'Household Junk',
      category: 'household',
      description: 'General household items, clothing, books, toys',
    },
    {
      name: 'Furniture',
      category: 'furniture',
      description: 'Couches, chairs, tables, dressers, mattresses',
    },
    {
      name: 'Appliances',
      category: 'appliances',
      description: 'Refrigerators, washers, dryers, dishwashers, stoves',
    },
    {
      name: 'Renovation Debris',
      category: 'renovation',
      description: 'Drywall, flooring, tiles, cabinets, construction waste',
    },
    {
      name: 'Yard Waste',
      category: 'yard',
      description: 'Branches, leaves, grass clippings, landscaping debris',
    },
  ];

  const materialTypes = await Promise.all(
    materialTypesData.map(data => 
      prisma.materialType.create({ data })
    )
  );

  // Seed Service Areas
  console.log('🌍 Creating service areas...');
  const serviceAreasData: Prisma.ServiceAreaCreateInput[] = [
    // Massachusetts
    { zipCode: '02101', city: 'Boston', state: 'MA', region: 'Greater Boston' },
    
    // North Carolina
    { zipCode: '27601', city: 'Raleigh', state: 'NC', region: 'Triangle' },
    { zipCode: '28201', city: 'Charlotte', state: 'NC', region: 'Charlotte Metro' },
    
    // New York
    { zipCode: '11701', city: 'Long Island', state: 'NY', region: 'Long Island' },
    
    // New Jersey
    { zipCode: '07101', city: 'Newark', state: 'NJ', region: 'North Jersey' },
    { zipCode: '07302', city: 'Jersey City', state: 'NJ', region: 'Hudson County' },
    
    // South Carolina
    { zipCode: '29401', city: 'Charleston', state: 'SC', region: 'Lowcountry' },
    
    // Georgia
    { zipCode: '30301', city: 'Atlanta', state: 'GA', region: 'Metro Atlanta' },
    { zipCode: '30901', city: 'Augusta', state: 'GA', region: 'CSRA' },
    
    // Pennsylvania
    { zipCode: '19101', city: 'Philadelphia', state: 'PA', region: 'Greater Philadelphia' },
    { zipCode: '15201', city: 'Pittsburgh', state: 'PA', region: 'Greater Pittsburgh' },
    
    // Delaware
    { zipCode: '19801', city: 'Wilmington', state: 'DE', region: 'New Castle County' },
    
    // Maryland
    { zipCode: '21201', city: 'Baltimore', state: 'MD', region: 'Baltimore Metro' },
    
    // Washington D.C.
    { zipCode: '20001', city: 'Washington', state: 'DC', region: 'DMV' },
    
    // Virginia
    { zipCode: '23220', city: 'Richmond', state: 'VA', region: 'Central Virginia' },
    { zipCode: '23451', city: 'Virginia Beach', state: 'VA', region: 'Hampton Roads' },
    
    // Florida
    { zipCode: '32201', city: 'Jacksonville', state: 'FL', region: 'Northeast Florida' },
    { zipCode: '33601', city: 'Tampa', state: 'FL', region: 'Tampa Bay' },
    { zipCode: '32801', city: 'Orlando', state: 'FL', region: 'Central Florida' },
    { zipCode: '33101', city: 'Miami', state: 'FL', region: 'South Florida' },
  ];

  const serviceAreas = await Promise.all(
    serviceAreasData.map(data => 
      prisma.serviceArea.create({ data })
    )
  );

  console.log('✅ Gummy seed completed successfully!');
  console.log(`📦 Created ${dumpsterTypes.length} dumpster types`);
  console.log(`🏗️ Created ${materialTypes.length} material types`);
  console.log(`🌍 Created ${serviceAreas.length} service areas`);
}

main()
  .catch((e: Error) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });