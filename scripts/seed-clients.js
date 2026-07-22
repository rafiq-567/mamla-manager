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

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  address: String,
  nid: String,
  assignedLawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }],
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'lawyer', 'paralegal'], default: 'lawyer' },
}, { timestamps: true });

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const firstNames = [
  'Md. Ashik', 'Nusrat', 'Kamal', 'Saleha', 'Shariful', 'Tanvir', 'Nahid',
  'Shahana', 'Nasir', 'Parvin', 'Jahangir', 'Shamima', 'Mizan', 'Sultana',
  'Riaz', 'Mosammat', 'Noman', 'Rokhsana', 'Kawsar', 'Rowshan',
  'Abdur', 'Hasina', 'Mofiz', 'Shahinur', 'Rafiqul', 'Jostna', 'Anwar',
  'Parveen', 'Shahjahan', 'Rahima', 'Delwar', 'Shahnaj', 'Morshed',
  'Jahanara', 'Abul', 'Shahidul', 'Nargis', 'Arafat', 'Fariha', 'Mahbub',
];

const lastNames = [
  'Hossain', 'Ahmed', 'Mia', 'Akter', 'Uddin', 'Khan', 'Begum',
  'Rahman', 'Haque', 'Sheikh', 'Mahmud', 'Parvez', 'Chowdhury', 'Nath',
  'Sarker', 'Mollah', 'Islam', 'Biswas', 'Das', 'Saha', 'Ali', 'Khatun',
];

const areas = [
  'Mirpur', 'Uttara', 'Gulshan', 'Banani', 'Dhanmondi', 'Mohammadpur',
  'Motijheel', 'Wari', 'Khilgaon', 'Badda', 'Rampura', 'Malibagh',
  'Shyamoli', 'Lalmatia', 'Mohakhali', 'Mughda', 'Shahbag', 'Kakrail',
  'Farmgate', 'Tejgaon', 'Paltan', 'Sutrapur', 'Gendaria', 'Hazaribagh',
];

const occupations = [
  'Businessman', 'Teacher', 'Doctor', 'Engineer', 'Lawyer',
  'Government Employee', 'Private Employee', 'Housewife', 'Student',
  'Farmer', 'Shopkeeper', 'Journalist', 'Banker', 'Army Officer',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhone() {
  const prefixes = ['017', '018', '019', '016', '015', '013'];
  return `${pick(prefixes)}${String(randomInt(10000000, 99999999))}`;
}

function generateNID() {
  const year = randomInt(1970, 2003);
  const serial = String(randomInt(10000, 99999));
  return `${year}${serial}${String(randomInt(1000, 9999))}`;
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne();
    if (!user) {
      console.log('No user found. Create a user first.');
      await mongoose.disconnect();
      return;
    }
    console.log(`Using user: ${user.name} (${user.email})`);

    await Client.deleteMany({});
    console.log('Cleared existing clients');

    const totalClients = 45;
    const clients = [];
    const usedNames = new Set();

    for (let i = 0; i < totalClients; i++) {
      let name;
      do {
        const firstName = pick(firstNames);
        const lastName = pick(lastNames);
        name = `${firstName} ${lastName}`;
      } while (usedNames.has(name));
      usedNames.add(name);

      clients.push({
        name,
        email: `${name.toLowerCase().replace(/[.\s]/g, '')}${randomInt(1, 999)}@email.com`,
        phone: generatePhone(),
        address: `${randomInt(1, 500)}, ${pick(areas)}, Dhaka ${randomInt(1200, 1362)}`,
        nid: generateNID(),
        assignedLawyer: user._id,
        cases: [],
      });
    }

    await Client.insertMany(clients);
    console.log(`Created ${totalClients} clients`);

    const finalCount = await Client.countDocuments();
    console.log(`\nSeeding complete! ${finalCount} clients created.`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
