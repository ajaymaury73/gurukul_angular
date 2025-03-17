export class NavbarItem {
    name: string = '';
    link: string = '';
    icon: string = '';
  }
  
  export class RoleNavbar {
    id?: string;
    role: string = '';
    navItems: NavbarItem[] = [];
  }
  