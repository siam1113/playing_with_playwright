import { FullConfig, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

class MyReporter implements Reporter {
  passed: string[] = [];
  failed: string[] = [];
  skipped: string[] = [];
  interrupted: string[] = [];
  timedOut: string[] = [];

  currentTestSuite = '';
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Ran ${suite.allTests().length} tests\n`);
  }

  onTestBegin(test: TestCase, result: TestResult): void {
    if (this.currentTestSuite != test.parent.title) {
      this.currentTestSuite = test.parent.title;
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    switch (result.status) {
      case "passed":
        this.passed.push(test.parent.title + " > " + test.title);
        break;
      case "failed":
        this.failed.push(test.parent.title + " > " + test.title);
        break;
      case "skipped":
        this.skipped.push(test.parent.title + " > " + test.title);
        break;
      case "interrupted":
        this.interrupted.push(test.parent.title + " > " + test.title);
        break;
      case "timedOut":
        this.timedOut.push(test.parent.title + " > " + test.title);
        break;
      default:
        break;
    }
  }

  onEnd() {
    console.log("Passed Tests:")
    for (let passedTest of this.passed) {
      console.log(passedTest);
    }

    console.log("\nSkipped Tests:")
    for (let passedTest of this.skipped) {
      console.log(passedTest);
    }
  }
}

export default MyReporter;