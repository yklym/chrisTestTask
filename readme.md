========Test==========
Create a simple web app for small business owners to apply for funds.

Frontend Part consists of four pages gathering the following data points:
Page 1 Form Fields
-full name
-email
-phone
Page 2 Form Fields
-yearly revenue
Page 3 Form Fields
-funding amount requested
Page 4 – End of Flow
Conditions to take note of:
• If user provided yearly revenue less than $50,000 or funding amount requested less than $25,000 show them “No offers found.”
• Otherwise a “Thank you, we will reach out to you shortly” page.

Backend Part (node app)
Build an api with 2 endpoints (for the database use whichever easy solution you’d like e.g. https://github.com/typicode/lowdb):

- save lead data
- get lead data

App Requirements:

- Save client progress of filling in the form (call save lead data api from UI).
- Use React for UI
- Add UI Validations
- Do some basic form styling

Additional requirement (optional):
Save client progress where they left off and next time route them to that page
e.g. if client fills in pages 1, 2 and dropped off on page 3, next time they load browser they see page 3 form and continue they process.
