import Layout from '../models/layoutModel';

class LayoutService {
  public async saveLayout(
    userId: string,
    name: string,
    layoutData: object,
    isDefault: boolean
  ) {
    const layout = await Layout.create({ userId, name, layoutData, isDefault });
    return layout;
  }

  public async getLayoutById(layoutId: string) {
    const layout = await Layout.findByPk(layoutId);
    if (!layout) throw new Error('Layout not found');
    return layout;
  }

  public async getDefaultLayout() {
    const layout = await Layout.findOne({ where: { isDefault: true } });
    if (!layout) throw new Error('Default layout not found');
    return layout;
  }

  public async deleteLayout(layoutId: string) {
    const layout = await Layout.findByPk(layoutId);
    if (!layout) throw new Error('Layout not found');
    await layout.destroy();
  }
}

export default new LayoutService();
