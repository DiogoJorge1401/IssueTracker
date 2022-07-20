import { Application } from "express";
import { IssueController } from "../controllers/IssueController";
import { IssueModel } from "../models/issue";

export default function (app: Application) {
  const issueController = new IssueController();

  app
    .route("/api/issues/:project")

    .get(async (req, res) => {
      const { project } = req.params;

      const issues = await issueController.find({ ...req.query, project });

      return res.json(issues);
    })

    .post(async (req, res) => {
      try {
        const { project } = req.params;
        const {
          issue_title,
          issue_text,
          created_by,
          assigned_to = "",
          status_text = "",
        } = req.body;
        const result = await issueController.create({
          assigned_to,
          created_by,
          issue_text,
          issue_title,
          project,
          status_text,
        });
        return res.json(result);
      } catch (error: any) {
        return res.json({ error: error.message });
      }
    })

    .put(async (req, res) => {
      try {
        const { _id, ...fields } = req.body;
        const result = await issueController.update({ _id, fields });
        return res.json(result);
      } catch (error: any) {
        return res.json(error);
      }
    })

    .delete(async (req, res) => {
      try {
        const { _id } = req.body;
        const result = await issueController.delete(_id);
        return res.json(result)
        
      } catch (error) {
        return res.json(error)
      }
    });
}
