# Interchange

## Features
- [ ] custom CMS
- [ ] Create *easily* removable stripe donation portal. _Not sure if they will want this, so make sure it's easy to remove_
- [ ] Make sure **all** features of main site are maintained


### UI
- [ ] _condtionally_ display special events
- [ ] sort volunteers by date added
- [ ] sort patrons by date added



## CMS Features

- [x] Add & Remove volunteers
  - [ ] Update volunteers
- [ ] Add & Remove patrons
  - [ ] Update patrons
- [ ] Edit text on main page
- [ ] Edit image(s) on main page
- [ ] Edit hours
- [ ] Create Special events
  - [ ] Time automated special events
- [ ] 'Featured' events that display in banner on main page
  - [ ] Featured events editable.

### V2 - Demo only for now.
  - [ ] Donation tracker, at least with those obtained through website, if payment portal is something that they like.




## Dates and To-dos:
### 12-03-22
- Started today around 1pm. Took a while to get comfortable with React-Admin but now things are going smoothly.
#### Resume by:
1. Fix issue with all volunteers returning same id as displayed in show component.
1. Change other async loops to use for in instead of map. I just got lucky with it until now.
1. Image Feature for Volunteer.
2. Update routes working for volunteer.
3. Image key added to volunteer and all related routes
    - Remove image on model delete
    - Remove old image on update
4. Essentially copy over everything to patron model, with only minor differences, then begin UI.
