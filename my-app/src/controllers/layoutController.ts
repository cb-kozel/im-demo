import { Request, Response } from 'express';
import LayoutService from '../services/layoutService';

class LayoutController {
  public async saveLayout(req: Request, res: Response): Promise<void> {
    try {
      const { userId, name, layoutData, isDefault } = req.body;
      const layout = await LayoutService.saveLayout(
        userId,
        name,
        layoutData,
        isDefault
      );
      res.status(201).json(layout);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  public async getLayoutById(req: Request, res: Response): Promise<void> {
    try {
      const { layoutId } = req.params;
      const layout = await LayoutService.getLayoutById(layoutId);
      res.status(200).json(layout);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  public async getDefaultLayout(req: Request, res: Response): Promise<void> {
    try {
      const layout = await LayoutService.getDefaultLayout();
      res.status(200).json(layout);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }

  public async deleteLayout(req: Request, res: Response): Promise<void> {
    try {
      const { layoutId } = req.params;
      await LayoutService.deleteLayout(layoutId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  }
}

export default new LayoutController();
