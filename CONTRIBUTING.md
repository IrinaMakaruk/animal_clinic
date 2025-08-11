# 🤝 Contributing to Animals Management System

Thank you for your interest in contributing to the Animals Management System! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Issue Reporting](#issue-reporting)

---

## 🤔 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Be patient** with newcomers
- **Focus on what's best** for the community
- **Show empathy** towards other contributors

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js 20.x or higher
- npm 10.x or higher
- Git
- Basic knowledge of Angular and/or Nest.js

### Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/animals-management-system.git
   cd animals-management-system
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/originalowner/animals-management-system.git
   ```

---

## 🛠️ Development Setup

### Backend Setup (Nest.js)

```bash
cd animals-api-nestjs
npm install
npm run start:dev
```

### Frontend Setup (Angular)

```bash
cd animal-client-new
npm install
ng serve
```

### Database Setup

The development environment uses SQLite by default. No additional setup required.

---

## 🔄 Making Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### 3. Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

**Examples:**
```bash
feat(auth): add JWT refresh token functionality
fix(pets): resolve species dropdown loading issue
docs(readme): update installation instructions
```

---

## 📝 Submitting Changes

### 1. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

1. **Go to GitHub** and navigate to your fork
2. **Click "New Pull Request"**
3. **Fill out the PR template** with:
   - Clear description of changes
   - Link to related issues
   - Screenshots (if UI changes)
   - Testing instructions

### 3. Pull Request Template

```markdown
## 📋 Description
Brief description of what this PR does.

## 🔗 Related Issues
Fixes #123

## 🧪 Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## 📷 Screenshots (if applicable)
Add screenshots for UI changes.

## ✅ Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

---

## 🎨 Style Guidelines

### TypeScript/JavaScript

- **Use TypeScript** strict mode
- **Follow Angular/Nest.js** style guides
- **Use meaningful** variable and function names
- **Add JSDoc comments** for public APIs
- **Use async/await** instead of promises where possible

### Angular Components

```typescript
// ✅ Good
@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `...`,
  styleUrl: './pet-list.component.scss'
})
export class PetListComponent implements OnInit {
  private petService = inject(PetService);
  
  ngOnInit(): void {
    this.loadPets();
  }
  
  private loadPets(): void {
    // Implementation
  }
}
```

### Nest.js Services

```typescript
// ✅ Good
@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}
  
  async findAll(): Promise<Pet[]> {
    return this.petRepository.find({
      relations: ['owner', 'species'],
    });
  }
}
```

### CSS/SCSS

- **Use BEM methodology** for class naming
- **Follow Material Design** principles
- **Use CSS custom properties** for theming
- **Ensure responsive design**

```scss
// ✅ Good
.pet-list {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  &__item {
    padding: 1rem;
    border-radius: 4px;
    
    &--selected {
      background-color: var(--primary-light);
    }
  }
}
```

---

## 🧪 Testing Guidelines

### Unit Tests

- **Write unit tests** for all new features
- **Maintain 80%+ coverage**
- **Use descriptive test names**
- **Test edge cases**

```typescript
// ✅ Good test
describe('PetService', () => {
  describe('findAll', () => {
    it('should return all pets with relationships', async () => {
      // Arrange
      const expectedPets = [mockPet1, mockPet2];
      petRepository.find.mockResolvedValue(expectedPets);
      
      // Act
      const result = await petService.findAll();
      
      // Assert
      expect(result).toEqual(expectedPets);
      expect(petRepository.find).toHaveBeenCalledWith({
        relations: ['owner', 'species'],
      });
    });
  });
});
```

### E2E Tests

- **Test critical user flows**
- **Test authentication**
- **Test error scenarios**

### Running Tests

```bash
# Backend tests
cd animals-api-nestjs
npm run test
npm run test:e2e

# Frontend tests
cd animal-client-new
ng test
ng e2e
```

---

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Environment details** (OS, Node version, browser)
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Error messages** or console logs

### Feature Requests

For feature requests, please provide:

1. **Clear description** of the feature
2. **Use case** and motivation
3. **Proposed solution** (if any)
4. **Alternative solutions** considered

### Issue Templates

Use the provided GitHub issue templates for consistency.

---

## 📚 Resources

### Documentation
- [Angular Documentation](https://angular.io/docs)
- [Nest.js Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material Angular](https://material.angular.io/)

### Tools
- [Angular CLI](https://cli.angular.io/)
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** acknowledgments section
- **GitHub releases** notes
- **Project changelog**

---

## ❓ Questions?

If you have questions about contributing:

- 💬 **GitHub Discussions**: [Ask Questions](https://github.com/yourusername/animals-management-system/discussions)
- 📧 **Email**: contributors@animals-management.com
- 📖 **Wiki**: [Contributor Guide](https://github.com/yourusername/animals-management-system/wiki)

---

## 🙏 Thank You!

Thank you for taking the time to contribute! Every contribution, no matter how small, makes a difference.

Happy coding! 🚀