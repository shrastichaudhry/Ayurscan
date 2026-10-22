import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const plants = [
  {
    id: 'tulsi-001',
    commonName: 'Tulsi',
    scientificName: 'Ocimum tenuiflorum',
    family: 'Lamiaceae',
    precautions:
      'Traditional-use information only. Consult a qualified healthcare professional for medical conditions, pregnancy, medication interactions, or persistent symptoms.',
    imageUrl: null,
  },
  {
    id: 'amla-001',
    commonName: 'Amla',
    scientificName: 'Phyllanthus emblica',
    family: 'Phyllanthaceae',
    precautions:
      'Traditional-use information only. Consult a qualified healthcare professional for medical conditions, pregnancy, medication interactions, or persistent symptoms.',
    imageUrl: null,
  },
  {
    id: 'aloe-vera-001',
    commonName: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    family: 'Asphodelaceae',
    precautions:
      'Traditional-use information only. External and internal preparations differ; consult a qualified healthcare professional before medicinal use.',
    imageUrl: null,
  },
  {
    id: 'turmeric-001',
    commonName: 'Turmeric',
    scientificName: 'Curcuma longa',
    family: 'Zingiberaceae',
    precautions:
      'Traditional-use information only. Consult a qualified healthcare professional for medical conditions, pregnancy, medication interactions, or persistent symptoms.',
    imageUrl: null,
  },
  {
    id: 'moringa-001',
    commonName: 'Moringa',
    scientificName: 'Moringa oleifera',
    family: 'Moringaceae',
    precautions:
      'Traditional-use information only. Consult a qualified healthcare professional for medical conditions, pregnancy, medication interactions, or persistent symptoms.',
    imageUrl: null,
  },
];

const medicinalUses = [
  // =========================
  // TULSI
  // =========================
  {
    id: 'tulsi-use-001',
    plantId: 'tulsi-001',
    title: 'Cough and cold support',
    plantPart: 'Leaf',
    description:
      'Traditionally used in Ayurveda for cough and cold preparations, including leaf juice or decoction.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'tulsi-use-002',
    plantId: 'tulsi-001',
    title: 'Fever support',
    plantPart: 'Leaf',
    description:
      'Traditionally used as a leaf-based preparation in fever and cold-related home remedies.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'tulsi-use-003',
    plantId: 'tulsi-001',
    title: 'Heartburn support',
    plantPart: 'Seed',
    description:
      'Tulsi seeds are traditionally used with milk or ghee in Ayurvedic home-remedy practice for heartburn.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'tulsi-use-004',
    plantId: 'tulsi-001',
    title: 'Sore mouth support',
    plantPart: 'Seed',
    description:
      'Tulsi seeds are traditionally described as being used with milk or ghee for sore mouth.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'tulsi-use-005',
    plantId: 'tulsi-001',
    title: 'Skin and wound-care preparations',
    plantPart: 'Leaf',
    description:
      'Tulsi leaf preparations are traditionally used in Ayurvedic home remedies for certain skin conditions and wounds.',
    traditionalUse: true,
    sourceName: 'CCRAS – Ayurvedic Home Remedies (Tulsi)',
  },

  // =========================
  // AMLA
  // =========================
  {
    id: 'amla-use-001',
    plantId: 'amla-001',
    title: 'Digestive and bowel support',
    plantPart: 'Fruit',
    description:
      'Amla is traditionally included in Triphala preparations used in Ayurvedic practice for constipation and digestive support.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'amla-use-002',
    plantId: 'amla-001',
    title: 'Anaemia dietary support',
    plantPart: 'Fruit',
    description:
      'Amla juice is described in CCRAS material as a traditional home remedy used as part of dietary support in anaemia.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'amla-use-003',
    plantId: 'amla-001',
    title: 'Diabetes-related traditional use',
    plantPart: 'Fruit',
    description:
      'Amla juice and fruit powder are described in CCRAS material among traditional Ayurvedic approaches used for diabetes.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'amla-use-004',
    plantId: 'amla-001',
    title: 'Leucorrhoea-related traditional use',
    plantPart: 'Fruit',
    description:
      'Amla powder is described in CCRAS material as a traditional remedy used in the Ayurvedic management of leucorrhoea.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'amla-use-005',
    plantId: 'amla-001',
    title: 'Rasayana and general wellness',
    plantPart: 'Fruit',
    description:
      'Amla is traditionally regarded as a Rasayana ingredient in Ayurveda and is used in preparations intended for general health and rejuvenation.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },

  // =========================
  // ALOE VERA
  // =========================
  {
    id: 'aloe-use-001',
    plantId: 'aloe-vera-001',
    title: 'Wound-care support',
    plantPart: 'Leaf pulp',
    description:
      'Aloe leaf pulp is traditionally applied as a topical dressing in Ayurvedic home-remedy practice for wounds.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'aloe-use-002',
    plantId: 'aloe-vera-001',
    title: 'Burn-care support',
    plantPart: 'Leaf pulp',
    description:
      'Aloe leaf pulp is traditionally used topically for burns.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'aloe-use-003',
    plantId: 'aloe-vera-001',
    title: 'Liver-related traditional use',
    plantPart: 'Leaf pulp',
    description:
      'CCRAS material describes Aloe leaf pulp as traditionally used in preparations for liver disorders.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'aloe-use-004',
    plantId: 'aloe-vera-001',
    title: 'Menstrual discomfort support',
    plantPart: 'Leaf pulp',
    description:
      'Aloe leaf pulp is described in CCRAS material among traditional uses for menstrual pain.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'aloe-use-005',
    plantId: 'aloe-vera-001',
    title: 'Hair and scalp care',
    plantPart: 'Leaf pulp',
    description:
      'Aloe leaf pulp is traditionally used for dandruff and hair-care preparations.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },

  // =========================
  // TURMERIC
  // =========================
  {
    id: 'turmeric-use-001',
    plantId: 'turmeric-001',
    title: 'Inflammation-related traditional use',
    plantPart: 'Rhizome',
    description:
      'Turmeric rhizome is traditionally described as having anti-inflammatory use in Ayurvedic practice.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'turmeric-use-002',
    plantId: 'turmeric-001',
    title: 'Antiseptic preparations',
    plantPart: 'Rhizome',
    description:
      'Turmeric rhizome is traditionally used in antiseptic preparations.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'turmeric-use-003',
    plantId: 'turmeric-001',
    title: 'Digestive support',
    plantPart: 'Rhizome',
    description:
      'Turmeric rhizome is traditionally described as carminative and used in digestive preparations.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'turmeric-use-004',
    plantId: 'turmeric-001',
    title: 'Wound and ulcer care',
    plantPart: 'Rhizome',
    description:
      'Turmeric rhizome is traditionally used in preparations for wounds and ulcers.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },
  {
    id: 'turmeric-use-005',
    plantId: 'turmeric-001',
    title: 'Skin and allergic-condition support',
    plantPart: 'Rhizome',
    description:
      'Turmeric rhizome is traditionally used in Ayurvedic preparations for skin diseases and allergic conditions.',
    traditionalUse: true,
    sourceName: 'CCRAS – Manual for ASHA/ANM',
  },

  // =========================
  // MORINGA
  // =========================
  {
    id: 'moringa-use-001',
    plantId: 'moringa-001',
    title: 'Skin nourishment',
    plantPart: 'Leaf',
    description:
      'Moringa is traditionally associated with skin nourishment and skin-care uses; the leaf is a documented medicinal part of the plant.',
    traditionalUse: true,
    sourceName: 'NMPB – Poshan Vatika Guidelines / E-Charak',
  },
  {
    id: 'moringa-use-002',
    plantId: 'moringa-001',
    title: 'Hair nourishment',
    plantPart: 'Leaf',
    description:
      'Moringa is traditionally associated with hair nourishment and hair-care uses; the leaf is a documented medicinal part.',
    traditionalUse: true,
    sourceName: 'NMPB – Poshan Vatika Guidelines / E-Charak',
  },
  {
    id: 'moringa-use-003',
    plantId: 'moringa-001',
    title: 'Swelling-related traditional use',
    plantPart: 'Leaf',
    description:
      'Moringa is traditionally associated with preparations used for swelling; leaf is one of the documented medicinal parts.',
    traditionalUse: true,
    sourceName: 'NMPB – Poshan Vatika Guidelines / E-Charak',
  },
  {
    id: 'moringa-use-004',
    plantId: 'moringa-001',
    title: 'Liver-support traditional use',
    plantPart: 'Leaf',
    description:
      'Moringa is traditionally associated with liver-support uses; leaf is a documented medicinal part of the plant.',
    traditionalUse: true,
    sourceName: 'NMPB – Poshan Vatika Guidelines / E-Charak',
  },
  {
    id: 'moringa-use-005',
    plantId: 'moringa-001',
    title: 'Digestive and stomach support',
    plantPart: 'Leaf',
    description:
      'Moringa is traditionally associated with stomach and digestive support; leaf is a documented medicinal part.',
    traditionalUse: true,
    sourceName: 'NMPB – Poshan Vatika Guidelines / E-Charak',
  },
];




async function main() {
  console.log("🌿 Seeding AyurScan plant information...");

  // Insert plants without deleting existing plants or user data.
  const plantResult = await prisma.plant.createMany({
    data: plants,
    skipDuplicates: true,
  });

  // Insert medicinal uses without deleting existing records.
  const useResult = await prisma.medicinalUse.createMany({
    data: medicinalUses,
    skipDuplicates: true,
  });

  const totalPlants = await prisma.plant.count();
  const totalUses = await prisma.medicinalUse.count();

  console.log(`✅ New plants inserted: ${plantResult.count}`);
  console.log(`✅ New medicinal uses inserted: ${useResult.count}`);
  console.log(`🌱 Total plants in database: ${totalPlants}`);
  console.log(`📚 Total medicinal uses in database: ${totalUses}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
