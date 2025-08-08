# ScholarForge Commit Message Guidelines

## Why Good Commit Messages Matter
- Help teammates and reviewers understand your changes
- Make the project history easy to follow
- Impress judges with professionalism

## Format
```
<type>: <short summary>

[optional body with more detail]
[optional footer: closes #issue-number]
```

### Types
- feat: New feature
- fix: Bug fix
- docs: Documentation only
- test: Adding or updating tests
- chore: Maintenance, refactor, or tooling

### Examples
```
feat: add batch minting to SkillNFT

Allows QuizMasters to mint multiple Skill NFTs in one call. Closes #12.

fix: correct XPToken mint event args

docs: update README with setup instructions

test: add edge case tests for SkillNFT

chore: add PR template and commit guidelines
```

## Best Practices
- Use the imperative mood ("add", not "added" or "adds")
- Keep the summary under 50 characters
- Use the body to explain "why" if needed
- Reference issues/PRs in the footer
