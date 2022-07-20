import { Application } from 'express';
import { IssueModel } from '../models/issue';

export default function (app: Application) {

  app.route('/api/issues/:project')

    .get(async (req, res) => {
      const { project } = req.params;

    })

    .post(async (req, res) => {
      const { project } = req.params;
      const { issue_title, issue_text, created_by, assigned_to = '', status_text = '' } = req.body

      const { _id, open, created_on, updated_on } = await IssueModel.create({
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      })

      return res.json({
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
      })

    })

    .put(async (req, res) => {
      const { project } = req.params;

    })

    .delete(async (req, res) => {
      const { project } = req.params;

    });

};
