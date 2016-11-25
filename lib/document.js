'use strict';

var Document = function(params) {
  params = params || {};

  this.name = params.name || '';
  this.group = '/api/v1/group/' + (params.group || '') + '/';
  this.do_email = params.do_email || true;
  if (params.return_signer_links) this.return_signer_links = params.return_signer_links;
  if (params.signature_type) this.signature_type = params.signature_type || 1;
  this.signers = params.signers || [];
  if (params.text) this.text = params.text || '';
  if (params.templatepdf && params.pdftext) {
    this.templatepdf = params.templatepdf || '';
    this.pdftext = params.pdftext || {};
  }
};

Document.prototype.setName = function(name) {
  this.name = name;
  return this;
};

Document.prototype.setGroup = function(group) {
  this.group = '/api/v1/group/' + group + '/';
  return this;
};

Document.prototype.setDoEmail = function(doEmail) {
  this.do_email = String(doEmail);
  return this;
};

Document.prototype.setSignatureType = function(signatureType) {
  this.signature_type = signatureType;
  return this;
};

Document.prototype.setSigners = function(signers) {
  this.signers = signers;
  return this;
};

Document.prototype.addSigner = function(signer) {
  this.signers.push(signer);
  return this;
};

Document.prototype.setText = function(text) {
  this.text = text;
  return this;
};

Document.prototype.addText = function(text) {
  this.text += text;
  return this;
};

Document.prototype.setTemplatePDF = function(templatePDF) {
  this.templatepdf = templatepdf;
  return this;
};

Document.prototype.setPDFText = function(pdfText) {
  this.pdftext = pdftext;
  return this;
};

Document.prototype.addPDFText = function(label, value) {
  this.pdftext[label] = value;
  return this;
};

module.exports = Document;
