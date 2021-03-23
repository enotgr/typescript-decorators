interface ComponentDecoratorConfig {
  selector: string;
  template: string;
  styleUrls?: string[];
}

function Component(config: ComponentDecoratorConfig) {
  return function <T extends { new (...args: any[]): object }>(Constructor: T) {
    return class extends Constructor {
      constructor(...args: any[]) {
        super(...args);

        this.addTemplate();
        this.addStyleUrls();
      }

      private addTemplate(): void {
        const element = document.querySelector(config.selector);

        if (element) {
          element.innerHTML = config.template;
        }
      }

      private addStyleUrls(): void {
        config.styleUrls?.forEach((styleUrl: string) => {
          const link = document.createElement('link');
          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('href', `app/${styleUrl}`);
          document.head.appendChild(link);
        });
      }
    };
  };
}

/** expample */
@Component({
  selector: 'app-login-form',
  styleUrls: ['component-example.component.css'],
  template: `
    <form class="form-container">
      <h2 class="text-center mb-3">Sign In</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `,
})
class LoginFormComponent {
  constructor(someArg: string) {
    console.log('Component log:', someArg);
  }
}

new LoginFormComponent('Component Example');
