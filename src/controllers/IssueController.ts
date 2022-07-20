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

    if (!Object.values(fields).filter(Boolean).length)
      throw { error: "no update field(s) sent", _id };

    try {
      const issue = await IssueModel.findById(_id);
      if (!issue) throw new Error();
      await issue.updateOne({
        ...fields,
        updated_on: new Date().toUTCString(),
      });
      return { result: "successfully updated", _id };
    } catch (error) {
      throw { error: "could not update", _id };
    }
  }

  async delete(_id: string) {
    if (!_id) throw { error: "missing _id" };
    try {
      const issue = await IssueModel.findById(_id);
      if (!issue) throw new Error();
      return { result: "successfully deleted", _id };
    } catch (error) {
      throw { error: "could not delete", _id };
    }
  }
}
