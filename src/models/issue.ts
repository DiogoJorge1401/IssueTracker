import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  project: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: "" },
  status_text: { type: String, default: "" },
  open: { type: Boolean, default: true },
  created_on: { type: String, default: () => new Date().toUTCString() },
  updated_on: { type: String, default: () => new Date().toUTCString() },
});

const IssueModel = mongoose.model("Issue", schema);

export { IssueModel };
