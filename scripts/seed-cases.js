const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && !process.env[key.trim()]) {
    process.env[key.trim()] = rest.join('=').trim();
  }
});

const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  caseType: { type: String, enum: ['Criminal', 'Civil', 'Family', 'Corporate', 'Labour', 'Tax'], required: true },
  status: { type: String, enum: ['Filed', 'In Progress', 'Pending', 'Won', 'Lost', 'Settled'], default: 'Filed' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  client: {
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String,
  },
  assignedLawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  opponent: String,
  court: String,
  filingDate: { type: Date, required: true },
  nextHearingDate: Date,
  description: String,
  documents: [{ title: String, url: String, publicId: String, category: String, uploadedAt: { type: Date, default: Date.now } }],
  notes: [{ content: String, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, createdAt: { type: Date, default: Date.now } }],
  timeline: [{ event: String, date: Date, description: String }],
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'lawyer', 'paralegal'], default: 'lawyer' },
  phone: String,
  specialization: String,
  barCouncilId: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Case = mongoose.models.Case || mongoose.model('Case', CaseSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const caseTypes = ['Criminal', 'Civil', 'Family', 'Corporate', 'Labour', 'Tax'];
const statuses = ['Filed', 'In Progress', 'Pending', 'Won', 'Lost', 'Settled'];
const priorities = ['High', 'Medium', 'Low'];

const courts = [
  'Supreme Court of Bangladesh', 'High Court Division', 'District Court',
  'Chief Metropolitan Magistrate Court', 'Labour Court', 'Family Court',
  'Administrative Tribunal', 'Land Survey Tribunal', 'Cyber Tribunal',
  'Money Loan Court', 'Joint District Court', 'Session Judge Court',
];

const opponentFirstNames = [
  'Md. Abdul', 'Md. Rahim', 'Fatima', 'Fariha', 'Hasan', 'Mahbub', 'Rashida',
  'Arafat', 'Shamim', 'Nargis', 'Rafiq', 'Shahidul', 'Jahanara', 'Abul',
  'Mizanur', 'Shahnaz', 'Anisur', 'Rokeya', 'Delwar', 'Sharmin',
];

const opponentLastNames = [
  'Khan', 'Rahman', 'Islam', 'Hossain', 'Sarker', 'Mollah', 'Chowdhury',
  'Ahmed', 'Khatun', 'Biswas', 'Das', 'Saha', 'Haque', 'Ali',
];

const clientFirstNames = [
  'Md. Ashik', 'Nusrat', 'Kamal', 'Saleha', 'Shariful', 'Tanvir', 'Nahid',
  'Shahana', 'Nasir', 'Parvin', 'Jahangir', 'Shamima', 'Mizan', 'Sultana',
  'Riaz', 'Mosammat', 'Noman', 'Rokhsana', 'Kawsar', 'Rowshan',
];

const clientLastNames = [
  'Hossain', 'Ahmed', 'Mia', 'Akter', 'Uddin', 'Khan', 'Begum',
  'Rahman', 'Haque', 'Sheikh', 'Mahmud', 'Parvez', 'Chowdhury', 'Nath',
];

const titlePrefixes = ['State vs', 'Md. vs', 'Mrs. vs', 'Case of', 'Matter of', 'Petition of'];
const titleNouns = [
  'Property Dispute', 'Divorce Decree', 'Contract Breach', 'Criminal Appeal',
  'Land Ownership', 'Child Custody', 'Loan Recovery', 'Cyber Crime',
  'Domestic Violence', 'Murder Trial', 'Theft Case', 'Drug Possession',
  'Traffic Violation', 'Corporate Fraud', 'Tax Evasion', 'Labor Dispute',
  'Robbery Case', 'Forgery Case', 'Defamation Case', 'Custody Battle',
  'Partition Suit', 'Arson Case', 'Bribery Case', 'Acid Attack',
];

const descriptions = [
  'This case involves a long-standing property dispute between neighboring families over ancestral land.',
  'The client is seeking legal remedy for breach of contract regarding a commercial agreement.',
  'A criminal case filed under relevant penal code sections for alleged financial fraud.',
  'Family dispute regarding division of inherited property and assets.',
  'Corporate litigation involving breach of fiduciary duty by company directors.',
  'Land dispute filed in the district court regarding illegal occupation of property.',
  'Custody battle for minor children following dissolution of marriage.',
  'Recovery of outstanding loan amount with interest as per contractual terms.',
  'Cyber crime case involving identity theft and financial fraud through online platforms.',
  'Appeal against lower court verdict in a criminal proceeding.',
  'Domestic violence case filed under the Prevention of Domestic Violence Act.',
  'Service matter regarding wrongful termination and recovery of back wages.',
  'Money loan case for recovery of principal amount with interest.',
  'Specific performance of contract for sale of property.',
  'Petition for restitution of conjugal rights in family court.',
  'Negotiable Instruments Act case regarding cheque dishonor.',
  'Case regarding illegal construction and violation of building codes.',
  'Motor vehicle accident claim for compensation.',
  'Labor dispute regarding unpaid wages and wrongful termination.',
  'Tax appeal against assessment order by tax authorities.',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateCaseNumber(index) {
  const prefixes = ['CR', 'CV', 'FA', 'CO', 'LA', 'TA'];
  const prefix = pick(prefixes);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${String(index).padStart(4, '0')}`;
}

function generatePhone() {
  const prefixes = ['017', '018', '019', '016', '015', '013'];
  return `${pick(prefixes)}${String(randomInt(10000000, 99999999))}`;
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const userCount = await User.countDocuments();
    let user;
    if (userCount === 0) {
      console.log('No users found. Creating default admin user...');
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('password123', salt);
      user = await User.create({
        name: 'Admin User',
        email: 'admin@legalfirm.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Default admin user created (admin@legalfirm.com / password123)');
    } else {
      user = await User.findOne();
    }

    if (!user) {
      console.log('No user available');
      await mongoose.disconnect();
      return;
    }
    console.log(`Using user: ${user.name} (${user.email})`);

    await Case.deleteMany({});
    console.log('Cleared existing cases');

    const totalCases = 75;
    let batch = [];

    for (let i = 1; i <= totalCases; i++) {
      const caseType = pick(caseTypes);
      const filingDate = randomDate(new Date('2023-01-01'), new Date('2026-07-22'));
      const hasHearing = Math.random() > 0.3;

      const status = pick(statuses);
      const priority = pick(priorities);

      const firstName = pick(clientFirstNames);
      const lastName = pick(clientLastNames);
      const clientName = `${firstName} ${lastName}`;
      const clientEmail = `${firstName.toLowerCase().replace(/[.\s]/g, '')}.${lastName.toLowerCase()}@email.com`;

      const opponentName = `${pick(opponentFirstNames)} ${pick(opponentLastNames)}`;

      const timeline = [
        {
          event: 'Case Filed',
          date: filingDate,
          description: 'Case has been formally filed with the court',
        },
      ];

      if (status === 'In Progress' || status === 'Pending') {
        timeline.push({
          event: 'First Hearing',
          date: randomDate(filingDate, new Date()),
          description: 'First hearing conducted, both parties present',
        });
        if (Math.random() > 0.5) {
          timeline.push({
            event: 'Evidence Submitted',
            date: randomDate(filingDate, new Date()),
            description: 'Evidence documents submitted to the court',
          });
        }
      } else if (status === 'Won') {
        const h1 = randomDate(filingDate, new Date());
        const trial = randomDate(h1, new Date());
        timeline.push(
          { event: 'First Hearing', date: h1, description: 'First hearing conducted' },
          { event: 'Trial', date: trial, description: 'Full trial conducted' },
          { event: 'Verdict', date: randomDate(trial, new Date()), description: 'Case won in favor of the client' },
        );
      } else if (status === 'Lost') {
        const h1 = randomDate(filingDate, new Date());
        timeline.push(
          { event: 'First Hearing', date: h1, description: 'First hearing conducted' },
          { event: 'Judgment', date: randomDate(h1, new Date()), description: 'Case decided against the client' },
        );
      } else if (status === 'Settled') {
        const h1 = randomDate(filingDate, new Date());
        timeline.push(
          { event: 'First Hearing', date: h1, description: 'First hearing conducted' },
          { event: 'Settlement', date: randomDate(h1, new Date()), description: 'Case settled out of court' },
        );
      }

      batch.push({
        caseNumber: generateCaseNumber(i),
        title: `${pick(titlePrefixes)} ${opponentName} - ${pick(titleNouns)}`,
        caseType,
        status,
        priority,
        client: {
          name: clientName,
          email: clientEmail,
          phone: generatePhone(),
          address: `${randomInt(1, 500)}, ${pick(['Mirpur', 'Uttara', 'Gulshan', 'Banani', 'Dhanmondi', 'Mohammadpur', 'Motijheel', 'Wari', 'Khilgaon', 'Badda'])} Dhaka ${String(randomInt(1200, 1230))}`,
        },
        assignedLawyer: user._id,
        opponent: opponentName,
        court: pick(courts),
        filingDate,
        nextHearingDate: hasHearing ? randomDate(new Date(), new Date('2027-06-01')) : undefined,
        description: pick(descriptions),
        timeline,
      });

      if (batch.length >= 20) {
        await Case.insertMany(batch);
        console.log(`Inserted ${i} / ${totalCases} cases`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      await Case.insertMany(batch);
    }

    const finalCount = await Case.countDocuments();
    console.log(`\nSeeding complete! ${finalCount} cases created successfully.`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
