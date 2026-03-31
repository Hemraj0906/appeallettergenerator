const req = require('http').request('http://localhost:5000/api/draft', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data).appealLetter.substring(0, 500)));
});
req.write(JSON.stringify({ insurer: 'uhc', state: 'CA', reason: 'not-medically-necessary', patientName: 'John Doe', amount: 5000, policyNumber: '123', claimNumber: '456', procedureDescription: 'Surgery' }));
req.end();
