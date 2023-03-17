Feature: E-commerce checkout
  
  Scenario: User is checking out items for discount
    Given a cart icon is present
    When cart items are equal to or greater than 5
    And a user clicks "cart icon"
    Then a user should see an appropriate discount
    When a user manually inputs "promo code" to "promo code field"
    Then the promo code should be valid
    And the higher savings should be applied
    When a user clicks "purchase button"
    Then the "purchase confirmation label" element should exist