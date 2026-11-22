import { PRDResponse } from '../types';

export const mockPRDResponse: PRDResponse = {
  version: 1,
  problemStatement: "College students often struggle to find affordable, late-night food options that deliver directly to their dorms. Existing platforms have high delivery fees and don't cater specifically to campus geography or student budgets.",
  targetUsers: [
    "Undergraduate students living in dorms",
    "Graduate students studying late at the library",
    "Campus organizations ordering food for events"
  ],
  personas: [
    {
      name: "Late-Night Larry",
      description: "A sophomore computer science major who studies until 3 AM.",
      goal: "Find cheap, filling food that can be delivered to his specific dorm building.",
      painPoints: [
        "Everything is closed after midnight",
        "Delivery fees on UberEats are too high",
        "Drivers often get lost finding his dorm"
      ]
    },
    {
      name: "Budget-Conscious Bella",
      description: "A freshman living on a tight monthly allowance.",
      goal: "Order food occasionally without breaking the bank.",
      painPoints: [
        "Hidden fees at checkout",
        "Minimum order amounts are too high for a single person"
      ]
    }
  ],
  userStories: [
    "As a student, I want to filter restaurants by 'open now' so I don't waste time looking at closed places.",
    "As a student, I want to select my specific dorm building from a dropdown so the driver knows exactly where to go.",
    "As a student, I want to split the bill with my roommate so we can share a large pizza.",
    "As a driver (student), I want to see deliveries on my campus so I can make money between classes."
  ],
  acceptanceCriteria: [
    "The app must show only restaurants currently accepting orders.",
    "The checkout page must allow selecting from a predefined list of campus buildings.",
    "Bill splitting feature must allow entering a friend's username or phone number.",
    "The app should load within 2 seconds on a 4G connection."
  ],
  mvpFeatures: [
    "User registration and login (Student email verification)",
    "Restaurant listing and menus",
    "Shopping cart and checkout",
    "Basic order tracking (Received, Preparing, Out for Delivery)",
    "Campus building selector for delivery address"
  ],
  futureFeatures: [
    "Bill splitting integration (Venmo/CashApp)",
    "Group orders",
    "Student driver program",
    "Meal plan/Dining dollars integration",
    "Loyalty points system"
  ],
  suggestedApis: [
    "Stripe API (for payments)",
    "Google Maps API (for distance and routing)",
    "Twilio API (for SMS order updates)",
    "SendGrid API (for email receipts)"
  ],
  databaseSchema: [
    "User (id, name, email, phone, university_id, role, created_at)",
    "Restaurant (id, name, description, address, open_time, close_time, rating)",
    "MenuItem (id, restaurant_id, name, description, price, image_url, is_available)",
    "Order (id, user_id, restaurant_id, total_amount, status, delivery_address, created_at)",
    "OrderItem (id, order_id, menu_item_id, quantity, price)"
  ],
  wireframeIdeas: [
    "Home Screen:\n- Top bar: Delivery address selector (Dorm name)\n- Search bar: 'What are you craving?'\n- Horizontal scroll: Categories (Pizza, Asian, Late Night)\n- Vertical list: Open restaurants with delivery time and fee",
    "Restaurant Details:\n- Header: Restaurant image, name, rating\n- Body: Categorized menu items (Appetizers, Mains, Drinks)\n- Floating Bottom Action Button: 'View Cart (2 items - $14.50)'",
    "Checkout Screen:\n- Order summary\n- Delivery instructions (Specific dorm room/door)\n- Payment method selector\n- 'Place Order' button"
  ],
  sprintPlan: [
    {
      week: "Week 1",
      tasks: [
        "Database schema design and setup",
        "User authentication (JWT)",
        "Basic frontend layout and navigation"
      ]
    },
    {
      week: "Week 2",
      tasks: [
        "Restaurant and menu API endpoints",
        "Frontend restaurant listing and menu display",
        "Shopping cart state management"
      ]
    },
    {
      week: "Week 3",
      tasks: [
        "Checkout flow and Stripe integration",
        "Order creation API",
        "Basic order history view"
      ]
    },
    {
      week: "Week 4",
      tasks: [
        "Driver dashboard (MVP)",
        "Order status updates",
        "Final testing and bug fixing"
      ]
    }
  ]
};
