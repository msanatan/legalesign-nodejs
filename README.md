=================
legalesign-nodejs
=================

Legalesign Node.js helper library - [https://legalesign.com/]

Quick start
-----------
```javascript
var legalesign = require('legalesign')(API_USERNAME, API_PASSWORD);
legalesign.send({
  name: 'Hello World',
  group: 'examplegroup',
  text: '<h1>Example heading</h1><p>Example body</p>',
  signers: [
    {
      firstname: 'Ex',
      lastname: 'Ample',
      email: 'example@legalesign.com',
      order: 0
    }
  ]
  do_email: 'true'
}, function(error, result) {
  if (error) {
    return console.log(error);
  }
  return console.log(result);
});
```

Installation
------------
```sh
npm install legalesign --save
```

Usage
-----
First initialise the Legalesign object using your API credentials. You can only
retrieve API credentials by request through your account on Legalesign's
website

```javascript
var legalesign = require('legalesign')(API_USERNAME, API_PASSWORD);
```

The next step is to describe the details of the document being sent:
```javascript
var document = {
  name: 'Hello World',
  group: 'examplegroup',
  text: '<h1>Example heading</h1><p>Example body</p>',
  signers: [
    {
      firstname: 'Ex',
      lastname: 'Ample',
      email: 'example@legalesign.com',
      order: 0
    }
  ]
  do_email: 'true'
};
```

Note that even though there is only one signer, the information must be kept in
an array.

Finally, you can send the document:

```javascript
legalesign.send(document, function(error, result) {
  if (error) {
    return console.log(error);
  }
  return console.log(result);
});
```

### Document
Alternatively, you can create a document using the Document object. This object
exposes many methods by which we can construct a document:

#### Parameters
```javascript
var params = {
  name = '',
  group = '/api/v1/group//',
  do_email = true,
  signature_type = 1
  signers = [],
  // Either set the text
  text = '',
  // OR the PDF to use
  templatepdf = '' // This is a Resource URI,
  pdftext = {} // A mapping of labels and values
};
var doc1 = new legalesign.Document(params);

// Feel free to use the following methods:
var doc2 = new legalesign.Document().setName('Hello World')
                          .setGroup('examplegroup')
                          .setText('<h1>Example heading</h1><p>Example body</p>')
                          .addSigner({
                            firstname: 'Ex',
                            lastname: 'Ample',
                            email: 'example@legalesign.com',
                            order: 0
                          })
                          .setDoEmail(true)
                          .setSignatureType(4);
```

#### setName
Setter for document name, accepts string
```javascript
var document = new legalesign.Document();
document.setName('Hello World');
```

#### setGroup
Setter for document group, accepts string. Note that only the group name is
required, *NOT* the URI for the group
```javascript
var document = new legalesign.Document();
document.setGroup('examplegroup');
```

#### setDoEmail
Setter for the do_email property (which determines whether the signers are sent
an email), accepts boolean.
```javascript
var document = new legalesign.Document();
document.setDoEmail(true);
```

#### setSignatureType
Setter for document signature_type, accepts integer
```javascript
var document = new legalesign.Document();
document.setSignatureType(4);
```

#### setSigners
Setter for document signers, accepts a list
```javascript
var document = new legalesign.Document();
document.setSigners([{
                      firstname: 'Ex',
                      lastname: 'Ample',
                      email: 'example@legalesign.com',
                      order: 0
                    }]);
```

#### addSigner
Adds a signer to the current list of document signers
```javascript
var document = new legalesign.Document();
document.addSigner({
                    firstname: 'Ex',
                    lastname: 'Ample',
                    email: 'example@legalesign.com',
                    order: 0
                  });
```

#### setText
Setter for the document text/content, accepts string
```javascript
var document = new legalesign.Document();
document.setText('<h1>Example heading</h1><p>Example body</p>');
```

#### addText
Adds text to the document
```javascript
var document = new legalesign.Document();
document.addText('<p>Au revoir</p>');
```

#### setTemplatePDF
Setter for the document's Template PDF (must be created online before), accepts
string. Note that this *MUST* be the template's online URI
```javascript
var document = new legalesign.Document();
document.setTemplatePDF('/api/v1/templatepdf/id');
```

#### setPDFText
Setter for the PDF text labels, accepts object
```javascript
var document = new legalesign.Document();
document.setPDFText({
  label: 'value'
});
```

#### addPDFText
Adds a label and value to the document, accepts two strings
```javascript
var document = new legalesign.Document();
document.addPDFText('label', 'value');
```

License
-------
Licensed under the MIT License