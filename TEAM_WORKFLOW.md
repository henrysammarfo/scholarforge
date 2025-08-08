# ScholarForge Team Workflow Guide

## 🏆 Winning Strategy: Maximize Collaboration & Commits

### Phase 1: GitHub Issues Setup (Team Lead)
1. **Create all 12 issues** from `GITHUB_ISSUES.md` in your GitHub repo
2. **Assign issues** to teammates:
   - @mrslick8601: Issues #1, #5, #9
   - @RicheySon: Issues #2, #6, #10
   - @Samxury: Issues #3, #7, #11
   - @TechGuygh: Issues #4, #8, #12
3. **Set up branch protection** (require PR reviews)

### Phase 2: Team Collaboration (Each Teammate)

#### For Each Issue:
1. **Create feature branch:**
   ```bash
   git checkout -b feature/issue-1-language-hero-nfts
   ```

2. **Copy-paste the provided code** from `GITHUB_ISSUES.md`

3. **Commit with clear message:**
   ```bash
   git add .
   git commit -m "feat: add Language Hero NFT logic to SkillNFT

   - Add languageHero mapping and LanguageHeroMinted event
   - Implement mintLanguageHero function with role-based access
   - Add comprehensive validation and error handling
   
   Closes #1"
   ```

4. **Push and create PR:**
   ```bash
   git push origin feature/issue-1-language-hero-nfts
   ```
   - Use the PR template
   - Link to the issue
   - Assign a reviewer

5. **Review other PRs** (each teammate reviews at least 2 PRs)

### Phase 3: Quality Assurance

#### Before Merging:
- [ ] Code compiles: `npx hardhat compile`
- [ ] Tests pass: `npx hardhat test`
- [ ] Linter passes: `npx hardhat lint` (if configured)
- [ ] PR reviewed by at least one teammate
- [ ] Issue linked in PR description

#### After Merging:
- [ ] Close the GitHub issue
- [ ] Delete the feature branch
- [ ] Update project progress

## 📊 Expected Results

### Commits (36+ total):
- Each teammate: 3 issues × 2-3 commits per issue = 6-9 commits
- Team lead: Setup, coordination, and final touches = 5-10 commits

### Pull Requests (12+ total):
- One PR per issue
- Each PR reviewed by at least one teammate
- Professional PR descriptions using template

### Collaboration Metrics:
- 12+ code reviews
- 4 active contributors
- Clear issue tracking and progress

## 🚀 Quick Start Commands

```bash
# Clone and setup
git clone <your-repo-url>
cd scholarforge
npm install

# For each issue:
git checkout -b feature/issue-<number>-<description>
# Copy-paste code from GITHUB_ISSUES.md
git add .
git commit -m "feat: <description>"
git push origin feature/issue-<number>-<description>
# Create PR on GitHub
```

## 🎯 Success Criteria

- [ ] All 12 issues completed and merged
- [ ] All tests passing
- [ ] Contracts deployed to testnet
- [ ] Professional documentation
- [ ] Active collaboration visible in GitHub
- [ ] Ready for judge presentation

---

**Remember:** Quality over speed. Each PR should be reviewable and mergeable. Judges will see your collaboration, not just the final code!
