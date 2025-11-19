export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Component name is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        template: 'export * from "./{{pascalCase name}}";',
      },
    ],
  });
}

