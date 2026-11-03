const test = require('node:test');
const assert = require('node:assert/strict');

function overlaps(existing, candidate) {
  return existing.some((lease) =>
    lease.id !== candidate.id &&
    lease.propertyId === candidate.propertyId &&
    lease.status !== 'Terminated' &&
    lease.startDate <= candidate.endDate &&
    lease.endDate >= candidate.startDate,
  );
}

test('rejects lease intervals that overlap for the same room', () => {
  assert.equal(overlaps([{id:'a',propertyId:'A',status:'Active',startDate:'2026-01-01',endDate:'2026-12-31'}], {id:'b',propertyId:'A',startDate:'2026-06-01',endDate:'2027-05-31'}), true);
});
test('allows adjacent intervals and different rooms', () => {
  const previous=[{id:'a',propertyId:'A',status:'Active',startDate:'2026-01-01',endDate:'2026-12-31'}];
  assert.equal(overlaps(previous,{id:'b',propertyId:'A',startDate:'2027-01-01',endDate:'2027-12-31'}),false);
  assert.equal(overlaps(previous,{id:'b',propertyId:'B',startDate:'2026-06-01',endDate:'2027-05-31'}),false);
});
