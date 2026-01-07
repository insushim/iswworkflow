import { PrismaClient } from '@prisma/client';
import {
  taskCategories,
  tasks,
  documentTypes,
  documentTemplates,
  eventTypes,
  eventTemplates,
  communitySources,
  academicCalendar,
} from './seed/index';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ===========================================
  // 1. Task Categories
  // ===========================================
  console.log('📁 Seeding task categories...');
  for (const category of taskCategories) {
    await prisma.taskCategory.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    });
  }
  console.log(`   ✅ ${taskCategories.length} task categories seeded\n`);

  // ===========================================
  // 2. Tasks with Workflows
  // ===========================================
  console.log('📋 Seeding tasks...');
  let taskCount = 0;
  let workflowCount = 0;

  for (const taskData of tasks) {
    const category = await prisma.taskCategory.findUnique({
      where: { name: taskData.categoryName },
    });

    if (!category) {
      console.log(`   ⚠️ Category not found: ${taskData.categoryName}`);
      continue;
    }

    const task = await prisma.task.upsert({
      where: {
        id: `task-${taskData.title.replace(/\s+/g, '-').toLowerCase()}`,
      },
      update: {
        title: taskData.title,
        description: taskData.description,
        categoryId: category.id,
        month: taskData.month,
        startMonth: taskData.startMonth,
        endMonth: taskData.endMonth,
        isRecurring: taskData.isRecurring || false,
        recurringType: taskData.recurringType,
        priority: taskData.priority,
        estimatedHours: taskData.estimatedHours,
        targetGrades: taskData.targetGrades,
        targetPositions: taskData.targetPositions,
        source: taskData.source,
        tags: taskData.tags,
        isVerified: true,
        verifiedCount: 1000,
      },
      create: {
        id: `task-${taskData.title.replace(/\s+/g, '-').toLowerCase()}`,
        title: taskData.title,
        description: taskData.description,
        categoryId: category.id,
        month: taskData.month,
        startMonth: taskData.startMonth,
        endMonth: taskData.endMonth,
        isRecurring: taskData.isRecurring || false,
        recurringType: taskData.recurringType,
        priority: taskData.priority,
        estimatedHours: taskData.estimatedHours,
        targetGrades: taskData.targetGrades,
        targetPositions: taskData.targetPositions,
        source: taskData.source,
        tags: taskData.tags,
        isVerified: true,
        verifiedCount: 1000,
      },
    });
    taskCount++;

    // Create workflow if steps exist
    if (taskData.workflowSteps && taskData.workflowSteps.length > 0) {
      // Delete existing workflow if any
      await prisma.workflow.deleteMany({
        where: { taskId: task.id },
      });

      const workflow = await prisma.workflow.create({
        data: {
          taskId: task.id,
          title: `${taskData.title} 워크플로우`,
          description: `${taskData.title} 업무 처리 단계별 가이드`,
          estimatedTime: taskData.workflowSteps.reduce(
            (acc, step) => acc + (step.estimatedTime || 0),
            0
          ),
          steps: {
            create: taskData.workflowSteps.map((step) => ({
              order: step.order,
              title: step.title,
              description: step.description,
              checkItems: step.checkItems
                ? JSON.stringify(step.checkItems)
                : null,
              tips: step.tips || [],
              warnings: step.warnings || [],
              estimatedTime: step.estimatedTime,
            })),
          },
        },
      });
      workflowCount++;
    }
  }
  console.log(`   ✅ ${taskCount} tasks seeded`);
  console.log(`   ✅ ${workflowCount} workflows seeded\n`);

  // ===========================================
  // 3. Document Types
  // ===========================================
  console.log('📄 Seeding document types...');
  for (const docType of documentTypes) {
    await prisma.documentType.upsert({
      where: { name: docType.name },
      update: docType,
      create: docType,
    });
  }
  console.log(`   ✅ ${documentTypes.length} document types seeded\n`);

  // ===========================================
  // 4. Document Templates
  // ===========================================
  console.log('📝 Seeding document templates...');
  let templateCount = 0;

  for (const template of documentTemplates) {
    const docType = await prisma.documentType.findUnique({
      where: { name: template.typeName },
    });

    if (!docType) {
      console.log(`   ⚠️ Document type not found: ${template.typeName}`);
      continue;
    }

    await prisma.documentTemplate.upsert({
      where: {
        id: `template-${template.name.replace(/\s+/g, '-').toLowerCase()}`,
      },
      update: {
        typeId: docType.id,
        name: template.name,
        description: template.description,
        content: template.content,
        variables: JSON.stringify(template.variables),
        example: template.example,
        source: template.source,
        isOfficial: template.isOfficial,
      },
      create: {
        id: `template-${template.name.replace(/\s+/g, '-').toLowerCase()}`,
        typeId: docType.id,
        name: template.name,
        description: template.description,
        content: template.content,
        variables: JSON.stringify(template.variables),
        example: template.example,
        source: template.source,
        isOfficial: template.isOfficial,
      },
    });
    templateCount++;
  }
  console.log(`   ✅ ${templateCount} document templates seeded\n`);

  // ===========================================
  // 5. Event Types
  // ===========================================
  console.log('📅 Seeding event types...');
  for (const eventType of eventTypes) {
    await prisma.eventType.upsert({
      where: { name: eventType.name },
      update: eventType,
      create: eventType,
    });
  }
  console.log(`   ✅ ${eventTypes.length} event types seeded\n`);

  // ===========================================
  // 6. Event Templates
  // ===========================================
  console.log('🎯 Seeding event templates...');
  let eventTemplateCount = 0;

  for (const template of eventTemplates) {
    const evtType = await prisma.eventType.findUnique({
      where: { name: template.typeName },
    });

    if (!evtType) {
      console.log(`   ⚠️ Event type not found: ${template.typeName}`);
      continue;
    }

    await prisma.eventTemplate.upsert({
      where: {
        id: `event-template-${template.name.replace(/\s+/g, '-').toLowerCase()}`,
      },
      update: {
        typeId: evtType.id,
        name: template.name,
        description: template.description,
        defaultDuration: template.defaultDuration,
        defaultLocation: template.defaultLocation,
        checklist: JSON.stringify(template.checklist),
        preparation: JSON.stringify(template.preparation),
        relatedDocs: template.relatedDocs,
        tips: template.tips,
      },
      create: {
        id: `event-template-${template.name.replace(/\s+/g, '-').toLowerCase()}`,
        typeId: evtType.id,
        name: template.name,
        description: template.description,
        defaultDuration: template.defaultDuration,
        defaultLocation: template.defaultLocation,
        checklist: JSON.stringify(template.checklist),
        preparation: JSON.stringify(template.preparation),
        relatedDocs: template.relatedDocs,
        tips: template.tips,
      },
    });
    eventTemplateCount++;
  }
  console.log(`   ✅ ${eventTemplateCount} event templates seeded\n`);

  // ===========================================
  // 7. Community Sources
  // ===========================================
  console.log('🌐 Seeding community sources...');
  for (const source of communitySources) {
    await prisma.communitySource.upsert({
      where: { url: source.url },
      update: source,
      create: source,
    });
  }
  console.log(`   ✅ ${communitySources.length} community sources seeded\n`);

  // ===========================================
  // 8. Academic Calendar
  // ===========================================
  console.log('🗓️ Seeding academic calendar...');
  const currentYear = new Date().getFullYear();

  for (const entry of academicCalendar) {
    // Calculate actual date based on month
    const year = entry.month >= 3 ? currentYear : currentYear + 1;
    const startDate = new Date(year, entry.month - 1, entry.day);

    let endDate: Date | null = null;
    if (entry.endMonth && entry.endDay) {
      const endYear = entry.endMonth >= 3 ? currentYear : currentYear + 1;
      endDate = new Date(endYear, entry.endMonth - 1, entry.endDay);
    }

    await prisma.academicCalendarEntry.upsert({
      where: {
        id: `calendar-${entry.title.replace(/\s+/g, '-').toLowerCase()}-${year}`,
      },
      update: {
        title: entry.title,
        description: entry.description,
        startDate,
        endDate,
        type: entry.type,
        targetGrades: entry.targetGrades,
        isNational: entry.isNational,
        source: entry.source,
      },
      create: {
        id: `calendar-${entry.title.replace(/\s+/g, '-').toLowerCase()}-${year}`,
        title: entry.title,
        description: entry.description,
        startDate,
        endDate,
        type: entry.type,
        targetGrades: entry.targetGrades,
        isNational: entry.isNational,
        source: entry.source,
      },
    });
  }
  console.log(`   ✅ ${academicCalendar.length} calendar entries seeded\n`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
