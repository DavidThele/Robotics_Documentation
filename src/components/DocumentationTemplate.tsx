import { colors, typography, layout } from '../styles/styles.ts';
import { ExternalLink } from 'lucide-react';
import ReactMarkdown from "react-markdown";

export function DocumentationTemplate({ data }: { data: any }) {
  if (data.type === 'folder') {
    return (
      <div style={{ color: colors.text }}>
        <h2 style={{ ...typography.h2, color: colors.secondary }}>{data.name}</h2>
        <p>Select a documentation file from the sidebar to view its contents.</p>
      </div>
    );
  }

  if (data.isLanding) {
    return (
      <div style={layout.flexColGap('1.5rem')}>
        <h1 style={{ ...typography.h1, color: colors.primary }}>{data.name}</h1>
        {data.content && (
          <ReactMarkdown
            components={{
              h1: ({...props}) => (
                <h1 style={{ ...typography.h1, color: colors.primary }} {...props} />
              ),
              h2: ({...props}) => (
                <h2 style={{ ...typography.h2, color: colors.secondary }} {...props} />
              ),
              p: ({...props}) => (
                <p style={{ ...typography.p, color: colors.text }} {...props} />
              ),
              ul: ({...props}) => (
                <ul
                  style={{
                    listStyleType: 'disc',
                    paddingLeft: '1.5rem',
                    marginBottom: '1rem',
                  }}
                  {...props}
                />
              ),
              ol: ({...props}) => (
                <ol
                  style={{
                    listStyleType: 'decimal',
                    paddingLeft: '1.5rem',
                    marginBottom: '1rem',
                  }}
                  {...props}
                />
              ),
              li: ({...props}) => (
                <li
                  style={{
                    ...typography.p,
                    color: colors.text,
                    marginBottom: '0.3rem',
                  }}
                  {...props}
                />
              ),
              a: ({ ...props }) => (
              <a
                style={{
                  color: colors.tertiary,   
                  textDecoration: 'underline',
                }}
                {...props}
              />
            ),
            }}
          >
            {data.content}
          </ReactMarkdown>
        )}

      </div>
    );
  }

  return (
    <div style={layout.flexColGap('1.5rem')}>
      <h1 style={{ ...typography.h1, color: colors.primary }}>{data.name}</h1>

      {data.classpath && (
        <div> 
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Classpath</h2>
          <div style={{ ...layout.card, padding: '0.5rem' }}>
            <code style={{ color: colors.text}}>{data.classpath}</code>
          </div>
        </div>
      )}

      {data.parentClass && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Parent Class</h2>
          <div style={{ ...layout.card, padding: '0.75rem' }}>
            <a
              href={`/documentation/${data.parentClass}`}
              style={{ color: colors.tertiary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>{data.parentClass}</code>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {data.implements && data.implements.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Implements</h2>
          <div style={layout.flexColGap('0.5rem', 'start')}>
            {data.implements.map((cls: string, i: number) => (
              <a
                key={i}
                href={`/documentation/${cls}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.tertiary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <code>{"• " + cls}</code>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      )}

      {data.subclasses && data.subclasses.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Subclasses</h2>
          <div style={layout.flexColGap('0.5rem', 'start')}>
            {data.subclasses.map((cls: string, i: number) => (
              <a
                key={i}
                href={`/documentation/${cls}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.tertiary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <code>{"• " + cls}</code>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      )}

      {data.description && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Description</h2>
          <p style={{ ...typography.p, color: colors.text, marginTop: '0.5rem' }}>{data.description}</p>
        </div>
      )}

      {data.seeAlso && data.seeAlso.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>See Also</h2>
          <div style={layout.flexColGap('0.5rem', 'start')}>
            {data.seeAlso.map((cls: string, i: number) => (
              <a
                key={i}
                href={`/documentation/${cls}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.tertiary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <code>{"• " + cls}</code>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      )}

      {data.constructors && (
      <div>
        <h2 style={{ ...typography.h2, color: colors.secondary }}>Constructors</h2>

        <div style={layout.flexColGap("0.75rem")}>
          {data.constructors.map((constructor: any, i: number) => (
            <details
              key={i}
              style={{
                ...layout.card,
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  color: colors.tertiary,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                }}
              >
                {constructor.name}
              </summary>

              <div style={{ marginTop: "0.75rem", ...layout.flexColGap("1rem") }}>
                
                {/* Description */}
                {constructor.description && (
                  <div>
                    <div style={{ color: colors.quaternary, marginBottom: "0.25rem" }}>
                      Description
                    </div>
                    <p style={{ ...typography.p, color: colors.text }}>
                      {constructor.description}
                    </p>
                  </div>
                )}

                {/* Parameters */}
                {constructor.parameters && (
                  <div>
                    <div style={{ color: colors.quaternary, marginBottom: "0.5rem" }}>
                      Arguments
                    </div>
                    {constructor.parameters.map((param: any, j: number) => (
                      <div key={j} style={{ marginLeft: "1rem", marginBottom: "0.25rem" }}>
                        <code style={{ color: colors.tertiary}}>{param.type + " "}</code>
                        <code style={{ color: colors.secondary }}>{param.name}</code>
                        <span style={{ ...typography.p, color: colors.text }}>
                          {" "}
                          – {param.description}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </details>
          ))}
        </div>
      </div>
    )}

      {data.exampleUsage && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Example Usage</h2>
          <div style={{ ...layout.card, marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
            <code style={{ color: colors.text}}>{data.exampleUsage}</code>
          </div>
        </div>
      )}

      {data.keyTerms && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>Key Terms</h2>
          <div style={layout.flexColGap('1rem', 'start')}>
            {data.keyTerms.map((term: any, i: number) => (
              <div key={i} style={{ ...layout.card, padding: '1rem' }}>
                <code style={{ color: colors.tertiary }}>
                  {term.name}
                </code>

                {term.description && (
                  <p style={{ ...typography.p, color: colors.text, marginTop: '0.25rem' }}>
                    {term.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.fields && (
        <div>
          <h2 style={{ ...typography.h2, color: colors.secondary }}>
            Important Fields
          </h2>

          <div style={{ ...layout.flexColGap("0.5rem") }}>
            {data.fields.map((field: any, i: number) => (
              <details key={i} style={{ ...layout.card, padding: "1rem" }}>
                <summary style={{ cursor: "pointer", fontWeight: "bold", color: colors.tertiary }}>
                  {field.name}
                </summary>

                <div style={{ marginTop: "0.75rem" }}>
                  {field.description && (
                    <p style={{ marginTop: ".5rem" }}>
                      <strong style={{ color: colors.quaternary }}>Description:</strong>{" "}
                      <span style={{ color: colors.text }}>{field.description}</span>
                    </p>
                  )}

                  {field.type && (
                    <p style={{ marginTop: ".5rem" }}>
                      <strong style={{ color: colors.quaternary }}>Type:</strong>{" "}
                      <span style={{ color: colors.text }}>{field.type}</span>
                    </p>
                  )}

                  {field.default && (
                    <p style={{ marginTop: ".25rem" }}>
                      <strong style={{ color: colors.quaternary }}>Default:</strong>{" "}
                      <span style={{ color: colors.text }}>{field.default}</span>
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {data.methods && (
      <div>
        <h2 style={{ ...typography.h2, color: colors.secondary }}>Methods</h2>

        <div style={layout.flexColGap("0.75rem")}>
          {data.methods.map((method: any, i: number) => (
            <details
              key={i}
              style={{
                ...layout.card,
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  color: colors.tertiary,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                }}
              >
                {method.name}
              </summary>

              <div style={{ marginTop: "0.75rem", ...layout.flexColGap("1rem") }}>
                
                {/* Description */}
                {method.description && (
                  <div>
                    <div style={{ color: colors.quaternary, marginBottom: "0.25rem" }}>
                      Description
                    </div>
                    <p style={{ ...typography.p, color: colors.text }}>
                      {method.description}
                    </p>
                  </div>
                )}

                {/* Parameters */}
                {method.parameters && (
                  <div>
                    <div style={{ color: colors.quaternary, marginBottom: "0.5rem" }}>
                      Arguments
                    </div>
                    {method.parameters.map((param: any, j: number) => (
                      <div key={j} style={{ marginLeft: "1rem", marginBottom: "0.25rem" }}>
                        <code style={{ color: colors.tertiary}}>{param.type + " "}</code>
                        <code style={{ color: colors.secondary }}>{param.name}</code>
                        <span style={{ ...typography.p, color: colors.text }}>
                          {" "}
                          – {param.description}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Returns */}
                {method.returns && (
                  <div>
                    <div style={{ color: colors.quaternary, marginBottom: "0.25rem" }}>
                      Returns
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      <code style={{ color: colors.secondary }}>
                        {method.returns.type}
                      </code>
                      <span style={{ ...typography.p, color: colors.text }}>
                        {" "}
                        – {method.returns.description}
                      </span>
                    </div>
                  </div>
                )}

                {/* Example */}
                {method.exampleUsage && (
                  <div>
                    <div style={{ color: colors.quaternary, marginBottom: "0.5rem" }}>
                      Example Usage
                    </div>
                    <div
                      style={{
                        backgroundColor: "#24272d",
                        padding: "0.75rem",
                        borderRadius: "0.375rem",
                      }}
                    >
                      <code
                        style={{
                          ...typography.p,
                          color: colors.text,
                          whiteSpace: "pre-wrap",
                          display: "block",
                        }}
                      >
                        {method.exampleUsage}
                      </code>
                    </div>
                  </div>
                )}

              </div>
            </details>
          ))}
        </div>
      </div>
    )}


      {data.content && !data.isLanding && <p style={{ ...typography.p, color: colors.text }}>{data.content}</p>}
    </div>
  );
}
