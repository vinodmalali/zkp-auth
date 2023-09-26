const axios = require('axios');

module.exports.createClaim = async function(req, res) {
    try {
        let did = req.body.did;
        let expirationDate = req.body.expiration || 2680532130;
        // let encodedCredentials = req.body.encodedCredentials;

        // const username = 'user-issuer';
        // const password = 'password-issuer';
        // const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        // console.log("encodedCredentials", encodedCredentials)
        // const encodedCredentials = `${username}:${password}`;

        // const credentials = {
        //     username: 'user-issuer', // Replace with your actual username
        //     password: 'password-issuer' // Replace with your actual password
        // };
       
        const encodedCredentials = 'dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy';
    //    const base64Credentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
    //    console.log("base64Credentials", base64Credentials);
        
    axios.post('https://self-hosted-platform.polygonid.me/v1/did:polygonid:polygon:mumbai:2qHrYKQnNG5meeKnhMiPk5FqMs9MgdpPRrxsbfHsgD/claims', {
        "credentialSchema": "https://raw.githubusercontent.com/vinodmalali/custom-schema-emp/main/proof-of-employee.json",
        "type": "ProofOfEmployee",
        "credentialSubject": {
          "id": did.toString(),
          "isEmployee": 1
        },
        "expiration": expirationDate
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      }).then((response) => {
        const dataId = response.data.id;
        return axios.get(`https://self-hosted-platform.polygonid.me/v1/did:polygonid:polygon:mumbai:2qHrYKQnNG5meeKnhMiPk5FqMs9MgdpPRrxsbfHsgD/claims/${dataId}/qrcode`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
        });
      }).then((response) => {
        res.status(200).json({
            response: response.data
        });
      }).catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error ineternal catch' });
      });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// then((response) => {
//     res.status(200).json({
//         response: response.data
//     });
// }).catch((err) => {
//     console.error(err.message);
//     res.status(500).json({ error: 'Internal Server Error ineternal catch' });
// });