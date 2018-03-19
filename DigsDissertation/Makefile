PROJECT=project 
TEX=pdflatex --shell-escape --interaction=nonstopmode -halt-on-error

all:
	$(TEX) $(PROJECT).tex

clean:
	$(RM) -rf *.log *.aux *.out *.bak *.idx *.toc *.nav *.snm *.vrb _minted-slides

