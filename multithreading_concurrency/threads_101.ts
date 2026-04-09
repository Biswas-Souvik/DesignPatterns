// Helper function to create a delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// SMS Task - simulates sending SMS with 2-second delay
class SMSTask {
  async run(): Promise<void> {
    try {
      await delay(2000); // 2-second delay for SMS
      console.log("SMS Sent using async/await.");
    } catch (error) {
      console.error(error);
    }
  }
}

// Email Task - simulates sending email with 3-second delay
class EmailTask {
  async run(): Promise<void> {
    try {
      await delay(3000); // 3-second delay for Email
      console.log("Email Sent using async/await.");
    } catch (error) {
      console.error(error);
    }
  }
}

// ETA Task - simulates ETA calculation with 5-second delay
class ETATask {
  async run(): Promise<void> {
    try {
      await delay(5000); // 5-second delay for ETA calculation
      console.log(
        "ETA Calculated using async/await. Estimated Time: 25 minutes.",
      );
    } catch (error) {
      console.error(error);
    }
  }
}

// Main function
async function main(): Promise<void> {
  // Create task objects for SMS, Email, and ETA calculation
  const smsTask = new SMSTask();
  const emailTask = new EmailTask();
  const etaTask = new ETATask();

  console.log("Task Started.\n");

  // Start all tasks concurrently using Promise.all()
  const smsPromise = smsTask.run();
  console.log("Task 1 ongoing...");

  const emailPromise = emailTask.run();
  console.log("Task 2 ongoing...");

  const etaPromise = etaTask.run();
  console.log("Task 3 ongoing...");

  try {
    // Wait for all tasks to complete
    await Promise.all([smsPromise, emailPromise, etaPromise]);
    console.log("All tasks completed.");
  } catch (error) {
    console.error(error);
  }
}

// Execute main function
main();
