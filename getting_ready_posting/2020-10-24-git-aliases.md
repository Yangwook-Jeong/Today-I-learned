[alias]
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
a = add $(git status -s | fzf -m | awk '{print $2}')
ch = "!git checkout $(git bselect)"
bselect = "! # select branch with preview; \n\
        f() { \
            _height=$(stty size | awk '{print $1}');\
            git branch | egrep -v '^\\*' | fzf --preview \"git lg {1} | head -n $_height\"; \
        }; f"
s = stash
        sa = stash apply
        sp = stash pop
        sd = stash drop
co = checkout
        cob = checkout -b
rb = rebase -i
        rbc = rebase --continue
        rba = rebase --abort
st = status
cm = commit
        cmm = commit -m
        cma = commit --amend
pl = pull
        plf = pull -f
ps = push
        psu = push upstream
        psut = push upstream --tags
        pst = push --tags
        psf = push -f
        psuf = push upstream -f
ad = add
        ada = add .
m = merge
        ms = merge --squash
b = branch
        bb = branch -b
        bd = branch -D
        bv = branch -v
        ba = branch -a
tg = tag -n
r = reset
        rh = reset --hard
        rs = reset --soft
f = flow
        ffs = flow feature start
        fff = flow feature finish
        ffp = flow feature publish
        frs = flow release start
        frf = flow release finish
        frp = flow release publish