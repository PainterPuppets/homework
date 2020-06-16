import { Rule, RuleMap, ProblemType, Problem } from '../interfaces';

let ruleset = [
    Rule.ProblemHeader,
    Rule.Choice,
    Rule.Hint,
]

export const convertMarkdownLineToSign = (line: string): { type: Rule, value: string } => {
    let type = {
        'type': Rule.Text,
        'value': line,
    };

    ruleset.map((rule) => {
        let re = new RegExp(`${RuleMap[rule]}(.*)`);
        let result = re.exec(line)
        if (result) {
            type = {
                'type': rule,
                'value': result[1],
            }
        }
    })

    return type;
}

export function convertMarkdownToProblem(markdown: string): Array<Problem> {
    let lines: Array<string> = markdown.split('\n').filter(line => line !== '').filter(line => line.length > 1)
    let signs: Array<{
        type: Rule,
        value: string,
    }> = lines.map(line => convertMarkdownLineToSign(line))
    let problems: Partial<Problem>[] = []
    let currentIndex = -1;
    let currentFlag: keyof Omit<Problem, 'type'> = 'title';

    signs.map((sign) => {
        if (sign.type === Rule.ProblemHeader) {
            currentIndex += 1;
            currentFlag = 'answer'
            problems[currentIndex] = {
                title: sign.value
            }

            return;
        }
        if (sign.type === Rule.Text) {
            if (currentFlag === 'options') {
                let result = /(.*)\.(.*)/g.exec(sign.value);
                if (result === null) {
                    throw Error('markdown格式错误')
                }

                problems[currentIndex][currentFlag]!.push({
                    value: result[1],
                    text: result[2],
                })
                return;

            }

            problems[currentIndex][currentFlag] = sign.value;

            return;
        }

        if (sign.type === Rule.Hint) {
            currentFlag = 'hint'
            problems[currentIndex][currentFlag] = '';
            return;
        }

        if (sign.type === Rule.Choice) {
            currentFlag = 'options'
            problems[currentIndex][currentFlag] = [];
            return;
        }
    })

    problems.map((problem) => {
        if (problem.options) {
            problem.type = ProblemType.Select;
        } else {
            problem.type = ProblemType.Fill;
            problem.options = [];
        }
        return problem as Problem;
    });

    return problems as Array<Problem>;
}