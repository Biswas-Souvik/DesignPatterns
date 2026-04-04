// Service class for payment processing
class PaymentService {
  makePayment(amount: number, accountId: string): void {
    "Payment of ₹" + amount + " successful for account " + accountId;
  }
}

// Service class for seat reservation
class SeatReservationService {
  reserveSeat(seatNumber: string, movieId: string): void {
    console.log("Seat " + seatNumber + " reserved for movie " + movieId);
  }
}

// Service class for sending notifications
class NotificationService {
  sendBookingConfirmation(userEmail: string): void {
    console.log("Booking confirmation sent to " + userEmail);
  }
}

// Service class for loyalty points
class LoyaltyPointsService {
  addPoints(accountId: string, points: number): void {
    console.log(points + " loyalty points added to account " + accountId);
  }
}

// Service class for generating movie tickets
class TicketService {
  generateTicket(movieId: string, seatNumber: string): void {
    console.log(
      "Ticket generated for movie " + movieId + ", Seat: " + seatNumber,
    );
  }
}

// ========== The MovieBookingFacade class  ==============
class MovieBookingFacade {
  private paymentService: PaymentService;
  private seatReservationService: SeatReservationService;
  private notificationService: NotificationService;
  private loyaltyPointsService: LoyaltyPointsService;
  private ticketService: TicketService;

  // Constructor to initialize all the subsystem services.
  public constructor() {
    this.paymentService = new PaymentService();
    this.seatReservationService = new SeatReservationService();
    this.notificationService = new NotificationService();
    this.loyaltyPointsService = new LoyaltyPointsService();
    this.ticketService = new TicketService();
  }

  // Method providing a simplified interface for booking a movie ticket
  bookMovieTicket(
    accountId: string,
    movieId: string,
    seatNumber: string,
    userEmail: string,
    amount: number,
  ): void {
    this.paymentService.makePayment(amount, accountId);
    this.seatReservationService.reserveSeat(seatNumber, movieId);
    this.ticketService.generateTicket(movieId, seatNumber);
    this.loyaltyPointsService.addPoints(accountId, 50);
    this.notificationService.sendBookingConfirmation(userEmail);

    // Indicate successful completion of the entire booking process.
    console.log("Movie ticket booking completed successfully!");
  }
}

// Client Code
function facade() {
  // Booking a movie ticket manually (using facade)
  const movieBookingFacade = new MovieBookingFacade();
  movieBookingFacade.bookMovieTicket(
    "user123",
    "movie456",
    "A10",
    "user@example.com",
    500,
  );
}

facade();
