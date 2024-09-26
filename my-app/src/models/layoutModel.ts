import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface LayoutAttributes {
  layoutId: string;
  userId: string;
  name: string;
  layoutData: object;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LayoutCreationAttributes
  extends Optional<LayoutAttributes, 'layoutId'> {}

class Layout
  extends Model<LayoutAttributes, LayoutCreationAttributes>
  implements LayoutAttributes
{
  public layoutId!: string;
  public userId!: string;
  public name!: string;
  public layoutData!: object;
  public isDefault!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Layout.init(
  {
    layoutId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    layoutData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'layouts',
    timestamps: true,
  }
);

export default Layout;
