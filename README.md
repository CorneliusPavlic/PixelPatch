# SpeakingToTheVoid

**SpeakingToTheVoid** is an experimental anonymous social media platform inspired by Yik Yak, where users can express their thoughts and ideas without any public-facing identification. The goal is to create a place where people can "speak to the void" without the pressure of social reputation or identity. Posts are completely anonymous, and profiles are hidden, allowing users to share freely while maintaining a degree of privacy and security.

## Features
- **Anonymous Posting**: Users can make posts that are visible to others but do not display any identifiable information.
- **Hidden Profiles**: Users have profiles that are completely hidden from public view, ensuring that no one can track who is posting.
- **Randomized Feed**: Posts are displayed in a randomized order, allowing users to view a diverse set of content.
- **One-Way Interaction**: Users cannot comment on posts. They can only view or rate content.
- **Anonymized Text Processing**: Any identifiable names or references within posts are automatically anonymized to prevent personal information from leaking.
- **Post Ratings**: A simple rating system (e.g., thumbs up/down) allows users to react to posts, but the feedback is not visible to the author, maintaining the spirit of speaking into the void.
- **Moderation & Post Flagging**: Despite the anonymity, posts are moderated to maintain a safe community. Users can flag inappropriate content, which is linked to their hidden profiles for review by moderators.
- **Secure Anonymity**: All user interactions are handled in a way that ensures user identities remain private, with strict data handling policies.

## Tech Stack
- **Backend**: Python with Flask/Django (or a similar framework) for API handling and content moderation.
- **Frontend**: React/Angular for a smooth and responsive UI experience.
- **Database**: MongoDB or PostgreSQL for managing posts and profiles securely.
- **Security**: OAuth2 and JWT for anonymous user session management.

## Goals
The purpose of SpeakingToTheVoid is to explore the dynamics of anonymous social interaction while promoting healthy and moderated discussions. We aim to build a platform where people can share openly and thoughtfully without the pressure of identity and reputation.
