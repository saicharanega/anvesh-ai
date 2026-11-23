import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'applications.json');
const raw = fs.readFileSync(filePath, 'utf8');
const applications = JSON.parse(raw);

console.log('--- ANVESH AI DATASET VALIDATION REPORT ---');

// 1. Exactly 100 applications
const totalCount = applications.length;
console.log(`1. Total Applications: ${totalCount} (Expected: 100) -> ${totalCount === 100 ? 'PASS' : 'FAIL'}`);

// 2. Exactly 10 original categories
const categories = Array.from(new Set(applications.map(a => a.category)));
console.log(`2. Total Categories: ${categories.length} (Expected: 10) -> ${categories.length === 10 ? 'PASS' : 'FAIL'}`);

// 3. Exactly 10 applications per category
const categoryBreakdown = {};
let allCategoriesHaveTen = true;
categories.forEach(cat => {
  const count = applications.filter(a => a.category === cat).length;
  categoryBreakdown[cat] = count;
  if (count !== 10) allCategoriesHaveTen = false;
});
console.log(`3. 10 Apps Per Category: ${allCategoriesHaveTen ? 'PASS' : 'FAIL'}`);
console.log('   Category Counts:', JSON.stringify(categoryBreakdown, null, 2));

// 4. No duplicate application names
const names = applications.map(a => a.name.trim().toLowerCase());
const uniqueNames = new Set(names);
const duplicates = names.filter((item, index) => names.indexOf(item) !== index);
console.log(`4. Duplicate Application Names Count: ${duplicates.length} -> ${duplicates.length === 0 ? 'PASS' : 'FAIL'}`);
if (duplicates.length > 0) {
  console.log('   Duplicates found:', duplicates);
}

// 5. Every application has its original starting URL
const missingUrls = applications.filter(a => !a.url || !a.url.startsWith('http'));
console.log(`5. Valid Original Starting URLs: ${totalCount - missingUrls.length} / ${totalCount} -> ${missingUrls.length === 0 ? 'PASS' : 'FAIL'}`);

// 6. Paygent Connect and NotebookLM retain their special research notes
const paygent = applications.find(a => a.name === 'Paygent Connect');
const notebooklm = applications.find(a => a.name === 'NotebookLM');

const paygentValid = paygent && paygent.specialResearchNotes && paygent.specialResearchNotes.includes('x402 protocol');
const notebooklmValid = notebooklm && notebooklm.specialResearchNotes && notebooklm.specialResearchNotes.includes('notebooklm-mcp');

console.log(`6. Special Research Notes:`);
console.log(`   - Paygent Connect Special Note: ${paygentValid ? 'PASS' : 'FAIL'}`);
if (paygent) console.log(`     "${paygent.specialResearchNotes}"`);
console.log(`   - NotebookLM Special Note: ${notebooklmValid ? 'PASS' : 'FAIL'}`);
if (notebooklm) console.log(`     "${notebooklm.specialResearchNotes}"`);

// 7. Schema completeness validation
const schemaFields = [
  'id', 'name', 'category', 'url', 'docsUrl', 'description', 
  'researchStatus', 'verificationStatus', 'confidence',
  'apiAvailable', 'apiType', 'apiBreadth', 'authMethod', 'authMethods', 
  'accessModel', 'apiAccess', 'mcpStatus', 'buildability',
  'toolCallingSupport', 'webhooksSupport', 'sdkAvailability', 
  'rateLimits', 'pricingTierForApi', 'sandboxAvailable',
  'integrationBlockers', 'commonBlockers', 'evidenceUrls',
  'agentSuitabilitySummary'
];

let allFieldsValid = true;
applications.forEach(a => {
  schemaFields.forEach(field => {
    if (a[field] === undefined) {
      console.log(`Missing field ${field} in ${a.id} (${a.name})`);
      allFieldsValid = false;
    }
  });
});
console.log(`7. Schema Completeness: ${allFieldsValid ? 'PASS' : 'FAIL'}`);

const overallPass = totalCount === 100 && 
                    categories.length === 10 && 
                    allCategoriesHaveTen && 
                    duplicates.length === 0 && 
                    missingUrls.length === 0 && 
                    paygentValid && 
                    notebooklmValid && 
                    allFieldsValid;

console.log(`\nOVERALL VALIDATION: ${overallPass ? 'ALL TESTS PASSED (100% INTEGRITY)' : 'FAILED'}`);
if (!overallPass) process.exit(1);
