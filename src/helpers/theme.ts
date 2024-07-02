class ThemeToggler {
  private buttonToggleTheme: HTMLButtonElement;
  private htmlTag: HTMLElement;

  constructor(buttonSelector: string, htmlSelector: string) {
    this.buttonToggleTheme = document.querySelector(
      buttonSelector
    ) as HTMLButtonElement;
    this.htmlTag = document.querySelector(htmlSelector) as HTMLElement;

    this.initialize();
  }

  private initialize() {
    this.getThemeFromLocalStorage();
    this.buttonToggleTheme.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  private toggleTheme() {
    if (this.htmlTag.classList.contains('dark')) {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  private setTheme(theme: string) {
    this.htmlTag.classList.add(theme);
    this.htmlTag.classList.remove(theme === 'dark' ? 'light' : 'dark');
    this.setThemeOnLocalStorage(theme);
  }

  private setThemeOnLocalStorage(theme: string) {
    localStorage.setItem('theme', theme);
    this.setIconToggleButton(theme);
  }

  private setIconToggleButton(theme: string) {
    if (theme === 'dark') {
      this.buttonToggleTheme.innerHTML = `<i class="fa fa-moon fa-xl"></i>`;
    } else if (theme === 'light') {
      this.buttonToggleTheme.innerHTML = `<i class="fa fa-sun fa-xl"></i>`;
    }
  }

  private getThemeFromLocalStorage() {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
      this.htmlTag.classList.add(theme);
      this.setIconToggleButton(theme);
    } else {
      this.setTheme('light');
    }
  }
}

// Instantiate the ThemeToggler class when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggler('#toggleTheme', 'html');
});
