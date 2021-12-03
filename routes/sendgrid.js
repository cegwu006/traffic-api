import client from '@sendgrid/client'

client.setApiKey('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');

const data = {
  "name": "testing trend"
};

const request = {
  url: `/v3/marketing/lists`,
  method: 'POST',
  body: data
}

client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch(error => {
    console.error(error);
  });