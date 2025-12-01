import { UserRole } from './schemas/user';

export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador',
  client: 'Cliente',
  cook: 'Cocinero',
  dispatcher: 'Despachador',
  driver: 'Conductor',
};
