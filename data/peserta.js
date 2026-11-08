// Raw participant data for Brainmatics training management system
// Contains duplicate entries by email to test uniqueness handling

export const rawPeserta = [
  { 
    id: 101, 
    name: "Aditya Prayoga", 
    email: "aditya@brainmatics.com", 
    class: "JavaScript Fundamentals", 
    score: 85 
  },
  { 
    id: 102, 
    name: "Zaim Fauzan", 
    email: "zaim@brainmatics.com", 
    class: "React Basics", 
    score: 92 
  },
  { 
    id: 103, 
    name: "Aditya Prayoga", 
    email: "aditya@brainmatics.com", 
    class: "JavaScript Fundamentals", 
    score: 88 
  }, // duplicate email - should keep this (latest entry)
  { 
    id: 104, 
    name: "Milea Kusuma", 
    email: "milea@brainmatics.com", 
    class: "JavaScript Fundamentals", 
    score: 78 
  },
  { 
    id: 105, 
    name: "Pratama Wijaya", 
    email: "pratama@brainmatics.com", 
    class: "React Basics", 
    score: 95 
  },
  { 
    id: 106, 
    name: "Zaim Fauzan", 
    email: "zaim@brainmatics.com", 
    class: "React Basics", 
    score: 94 
  }, // duplicate email - should keep this (latest entry)
];
