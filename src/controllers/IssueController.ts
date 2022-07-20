import { IssueModel } from "../models/issue";

interface IssueCreationData {
  project: any;
  issue_title: any;
  issue_text: any;
  created_by: any;
  assigned_to: any;
  status_text: any;
}

interface Query {
  [key: string]: any;
}

export class IssueController {
  async create({
    project,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
  }: IssueCreationData) {
    if (!issue_title || !issue_text || !created_by)
      throw new Error("required field(s) missing");

    const { _id, open, created_on, updated_on } = await IssueModel.create({
      project,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
    });

    return {
      _id,
      project,
      issue_title,
      issue_text,
      created_by,
      assigned_to,
      status_text,
      open,
      created_on,
      updated_on,
    };
  }

  async find(query: Query) {
    return await IssueModel.find(query).select({ __v: false });
  }

  async update({ _id, fields }) {
    if (!_id) throw { error: "missing _id" };
    if (!Object.keys(fields).length)
      throw { error: "no update field(s) sent", _id };
    try {
      await IssueModel.findOneAndUpdate({ _id }, fields);
    } catch (error) {
      throw { error: "could not update", _id };
    }
  }
}
