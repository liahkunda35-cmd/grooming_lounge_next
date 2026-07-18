export default function BookPage() {
  return (
    <>
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="section__label reveal reveal--fade-up">Reserve Your Spot</span>
            <h1 className="page-hero__title reveal reveal--fade-up">Book an Appointment</h1>
            <p className="page-hero__desc reveal reveal--fade-up">
              Complete the form below and we will confirm your booking via WhatsApp.
            </p>
          </div>
        </section>

        <section className="section section--white section--booking">
          <div className="container">
            <aside className="appointment-notice reveal reveal--fade-up" aria-label="Appointment policy">
              <h2 className="appointment-notice__title">Appointment Notice</h2>
              <p>
                To provide the best experience for all our clients, each appointment includes a{" "}
                <strong>10-minute grace period</strong>. If you arrive more than 10 minutes after your
                scheduled appointment time, your booking may be forfeited, and you may need to wait for
                the next available slot. Thank you for your understanding and cooperation.
              </p>
            </aside>

            <form className="booking-form reveal reveal--zoom" id="booking-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  <span className="form-error" id="name-error" role="alert"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="phone-input">
                    <span className="phone-input__prefix" aria-hidden="true">
                      +260
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      inputMode="numeric"
                      placeholder="761000376"
                      autoComplete="tel-national"
                      maxLength={9}
                    />
                  </div>
                  <span className="form-error" id="phone-error" role="alert"></span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service-category">Service Category</label>
                  <select id="service-category" name="service-category">
                    <option value="">Select a category</option>
                    <option value="barber">Barbershop</option>
                    <option value="hairdresser">Salon</option>
                  </select>
                  <span className="form-error" id="service-category-error" role="alert"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service</label>
                  <select id="service" name="service" disabled>
                    <option value="">Please select a category first</option>
                  </select>
                  <span className="form-error" id="service-error" role="alert"></span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date of Appointment</label>
                  <input type="date" id="date" name="date" />
                  <span className="form-error" id="date-error" role="alert"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" name="time" />
                  <span className="form-error" id="time-error" role="alert"></span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="label-optional">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Any special requests or notes?"
                ></textarea>
              </div>

              <aside className="booking-summary" id="booking-summary" hidden={true} aria-live="polite">
                <h2 className="booking-summary__title">Booking Summary</h2>
                <dl className="booking-summary__list">
                  <div className="booking-summary__item">
                    <dt>Category</dt>
                    <dd id="summary-category">—</dd>
                  </div>
                  <div className="booking-summary__item">
                    <dt>Service</dt>
                    <dd id="summary-service">—</dd>
                  </div>
                  <div className="booking-summary__item">
                    <dt>Price</dt>
                    <dd id="summary-price">—</dd>
                  </div>
                  <div className="booking-summary__item">
                    <dt>Specialist</dt>
                    <dd id="summary-specialist">—</dd>
                  </div>
                  <div className="booking-summary__item">
                    <dt>Date &amp; Time</dt>
                    <dd id="summary-datetime">—</dd>
                  </div>
                  <div className="booking-summary__item">
                    <dt>Client</dt>
                    <dd id="summary-client">—</dd>
                  </div>
                </dl>
              </aside>

              <p className="form-success" id="form-success" role="status" hidden={true}></p>

              <button type="submit" className="btn btn--primary btn--glow btn--full">
                Submit Booking Request
              </button>
            </form>
          </div>
        </section>

        <section className="section section--white">
          <div className="container">
            <section className="reviews-section reveal reveal--fade-up" id="reviews-section" aria-labelledby="reviews-title">
              <header className="reviews-section__header">
                <span className="section__label">Testimonials</span>
                <h2 className="section__title section__title--luxury" id="reviews-title">
                  Customer Reviews
                </h2>
                <p className="section__desc">Share your experience — rate us and leave a brief review.</p>
              </header>

              <form className="review-form" id="review-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reviewer-name">Your Name</label>
                    <input
                      type="text"
                      id="reviewer-name"
                      name="reviewer-name"
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                    <span className="form-error" id="reviewer-name-error" role="alert"></span>
                  </div>
                  <div className="form-group">
                    <label>Your Rating</label>
                    <div className="star-rating" id="star-rating" role="radiogroup" aria-label="Star rating">
                      <button type="button" className="star-rating__star" data-value="1" aria-label="1 star">
                        ★
                      </button>
                      <button type="button" className="star-rating__star" data-value="2" aria-label="2 stars">
                        ★
                      </button>
                      <button type="button" className="star-rating__star" data-value="3" aria-label="3 stars">
                        ★
                      </button>
                      <button type="button" className="star-rating__star" data-value="4" aria-label="4 stars">
                        ★
                      </button>
                      <button type="button" className="star-rating__star" data-value="5" aria-label="5 stars">
                        ★
                      </button>
                    </div>
                    <span className="form-error" id="rating-error" role="alert"></span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="review-text">Your Review</label>
                  <textarea
                    id="review-text"
                    name="review-text"
                    rows={3}
                    placeholder="Tell us about your visit (brief review)"
                  ></textarea>
                  <span className="form-error" id="review-text-error" role="alert"></span>
                </div>
                <p className="form-success" id="review-success" role="status" hidden={true}></p>
                <button type="submit" className="btn btn--outline btn--full">
                  Submit Review
                </button>
              </form>

              <div className="reviews-list" id="reviews-list" aria-live="polite">
                <article className="review-card review-card--sample">
                  <div className="review-card__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <div className="review-card__content">
                    <p className="review-card__text review-card__text--clamp">
                      &quot;Best grooming experience in Lusaka. Professional barbers and a beautiful salon
                      space.&quot;
                    </p>
                    <button type="button" className="review-card__toggle" hidden={true} aria-expanded="false">
                      ... See More
                    </button>
                  </div>
                  <span className="review-card__author">— James M.</span>
                </article>
                <article className="review-card review-card--sample">
                  <div className="review-card__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <div className="review-card__content">
                    <p className="review-card__text review-card__text--clamp">
                      &quot;Amazing braids and nails! The salon team is incredibly talented and
                      welcoming.&quot;
                    </p>
                    <button type="button" className="review-card__toggle" hidden={true} aria-expanded="false">
                      ... See More
                    </button>
                  </div>
                  <span className="review-card__author">— Sarah K.</span>
                </article>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
