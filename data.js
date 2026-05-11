(function () {
  const experiments = [
    {
      id: 1,
      title: "Experiment 1: Thermochemistry and Neutralization",
      shortTitle: "Thermochemistry",
      summary:
        "Heat changes in reactions, neutralization, acid/base definitions, q, Delta H, and temperature change.",
    },
    {
      id: 2,
      title: "Experiment 2: Solutions and Concentrations",
      shortTitle: "Solutions",
      summary:
        "Solution types, concentration meaning, molality, percent concentration, ppm, and ppb.",
    },
    {
      id: 3,
      title: "Experiment 3: Calculating Molarity",
      shortTitle: "Molarity",
      summary:
        "Molarity as moles per liter of solution, M = n / V_L, and n = Mass / M.wt.",
    },
    {
      id: 4,
      title: "Experiment 4: Solubility",
      shortTitle: "Solubility",
      summary:
        "Solubility definition, dissolution temperature, affecting factors, direct heat relation, and salt order.",
    },
    {
      id: 5,
      title: "Experiment 5: Electrical Conductivity",
      shortTitle: "Conductivity",
      summary:
        "Electrolyte solutions, moving ions, 5% NaCl preparation, and the inverse temperature relationship.",
    },
    {
      id: 6,
      title: "Experiment 6: Freezing Point Depression Constant",
      shortTitle: "Freezing Point",
      summary:
        "Benzene Kf calculation, Delta T, T1/T2 meanings, W, and formulas for benzene, naphthalene, and acetone.",
    },
  ];

  const questions = [];

  function add(exp, type, prompt, payload) {
    const id = `e${exp}-${String(questions.filter((q) => q.exp === exp).length + 1).padStart(2, "0")}`;
    questions.push({
      id,
      exp,
      type,
      prompt,
      source: `Source: PDF summary, Experiment ${exp}.`,
      ...payload,
    });
  }

  function mcq(exp, prompt, options, answer, explanation) {
    add(exp, "mcq", prompt, { options, answer, explanation });
  }

  function tf(exp, prompt, answer, explanation) {
    add(exp, "tf", prompt, { answer, explanation });
  }

  function fill(exp, prompt, answers, displayAnswer, explanation) {
    add(exp, "fill", prompt, { answers, displayAnswer, explanation });
  }

  function multi(exp, prompt, options, answers, explanation) {
    add(exp, "multi", prompt, { options, answers, explanation });
  }

  function matching(exp, prompt, pairs, explanation) {
    add(exp, "matching", prompt, { pairs, explanation });
  }

  function order(exp, prompt, items, explanation) {
    add(exp, "order", prompt, { items, explanation });
  }

  const reactionTypes = [
    "formation",
    "decomposition/separation",
    "single replacement",
    "double replacement",
    "combustion",
    "neutralization",
  ];

  mcq(1, "What does thermochemistry study?", ["Changes in heat energy that accompany chemical reactions", "Only the color of chemical substances", "The shape of glassware used in reactions", "Only the mass of solids after filtration"], "Changes in heat energy that accompany chemical reactions", "The file defines thermochemistry as the chemistry branch concerned with thermal energy changes accompanying reactions.");
  mcq(1, "Which products are formed in a neutralization reaction?", ["Salt and water", "Acid and metal", "Base and gas", "Only water"], "Salt and water", "Neutralization is listed as acid plus base producing salt and water.");
  mcq(1, "Which equation matches the neutralization example with sodium hydroxide?", ["NaOH + HCl -> NaCl + H2O", "NaCl + H2O -> NaOH + HCl", "KOH + HCl -> NaCl + H2O", "NaOH + HNO3 -> KNO3 + H2O"], "NaOH + HCl -> NaCl + H2O", "The PDF gives NaOH reacting with HCl to form NaCl and water.");
  mcq(1, "Which equation matches potassium hydroxide reacting with nitric acid?", ["KOH + HNO3 -> KNO3 + H2O", "KOH + HCl -> KCl + H2O", "NaOH + HNO3 -> KNO3 + H2O", "KNO3 + H2O -> KOH + HNO3"], "KOH + HNO3 -> KNO3 + H2O", "The second neutralization example is KOH plus HNO3 forming KNO3 and water.");
  mcq(1, "According to the file, a base is a substance able to give which ion?", ["OH-", "H+", "Na+", "Cl-"], "OH-", "The base definition in the file is a substance able to give hydroxide ion OH-.");
  mcq(1, "According to the file, an acid is a substance able to give which ion?", ["H+", "OH-", "Na+", "NO3-"], "H+", "The acid definition in the file is a substance able to give hydrogen ion H+.");
  mcq(1, "What is a salt described as?", ["A material made from a metallic part and a nonmetallic part", "Only a solution that contains water", "A substance that always gives H+", "A gas formed after combustion"], "A material made from a metallic part and a nonmetallic part", "The source defines salt as made from a metallic part and a nonmetallic part.");
  mcq(1, "What is the approximate Cp value listed for the solution?", ["4.18 J/g.C", "1.00 J/g.C", "9.81 J/g.C", "128 J/g.C"], "4.18 J/g.C", "The PDF lists the solution specific heat as approximately 4.18 J/g.C.");
  mcq(1, "Which equation is used to calculate heat quantity?", ["q = Cp * m * Delta T", "Delta H = q", "m = q * V", "Cp = V * d"], "q = Cp * m * Delta T", "The heat equation in the file is q = Cp * m * Delta T.");
  mcq(1, "Which equation gives total solution mass?", ["m = V * d", "m = n / V_L", "m = Cp * Delta T", "m = W * 128"], "m = V * d", "The source says total solution mass is calculated from m = V * d.");
  mcq(1, "How is Delta T defined in the thermochemistry experiment?", ["T2 - T1", "T1 - T2", "T1 + T2", "T2 / T1"], "T2 - T1", "The PDF states Delta T is the temperature change T2 - T1.");
  mcq(1, "What is the relationship between enthalpy change and q?", ["Delta H = -q", "Delta H = q", "Delta H = q / Cp", "Delta H = q * m"], "Delta H = -q", "The source explicitly states Delta H = -q.");
  tf(1, "Neutralization is a reaction between an acid and a base.", true, "The file defines neutralization as an acid-base reaction that produces salt and water.");
  tf(1, "A neutralization reaction produces salt but not water.", false, "The source says neutralization produces both salt and water.");
  tf(1, "The listed acid definition is the ability to give OH-.", false, "That is the base definition. The acid gives H+.");
  tf(1, "If q is negative in the reaction, the reaction is exothermic.", true, "The file notes negative q corresponds to an exothermic reaction.");
  tf(1, "If q is positive in the reaction, the reaction is endothermic.", true, "The source says positive q corresponds to an endothermic reaction.");
  tf(1, "Delta H has the same sign as q in this experiment.", false, "The stated relationship is Delta H = -q, so the signs are opposite.");
  tf(1, "The experiment may mix equal volumes, such as 20 mL acid and 20 mL base.", true, "The PDF gives equal volumes as an example: 20 mL acid with 20 mL base.");
  fill(1, "Complete the heat equation: q = Cp * m * ____.", ["Delta T", "delta t", "dt"], "Delta T", "The file gives q = Cp * m * Delta T.");
  fill(1, "Complete the enthalpy relationship: Delta H = ____.", ["-q", "negative q"], "-q", "The source states that Delta H equals negative q.");
  fill(1, "A base gives the ion ____.", ["OH-", "OH"], "OH-", "The file defines a base by its ability to give hydroxide ion OH-.");
  fill(1, "An acid gives the ion ____.", ["H+", "H"], "H+", "The file defines an acid by its ability to give hydrogen ion H+.");
  fill(1, "The solution specific heat Cp is approximately ____ J/g.C.", ["4.18", "4.18 J/g.C"], "4.18 J/g.C", "The listed approximate Cp value is 4.18 J/g.C.");
  multi(1, "Select all reaction types listed in Experiment 1.", ["formation", "combustion", "neutralization", "chromatography", "single replacement", "evaporation only"], ["formation", "combustion", "neutralization", "single replacement"], "The file lists formation, decomposition/separation, single replacement, double replacement, combustion, and neutralization as reaction types.");
  matching(1, "Match each thermochemistry term to its source definition.", [{ left: "Acid", right: "Gives H+" }, { left: "Base", right: "Gives OH-" }, { left: "Salt", right: "Metallic part plus nonmetallic part" }, { left: "Aqueous solution", right: "Salt dissolved in solution after acid-base reaction" }], "These definitions are taken directly from the basic concepts section.");
  matching(1, "Match each symbol to its meaning in q = Cp * m * Delta T.", [{ left: "q", right: "Heat quantity" }, { left: "Cp", right: "Specific heat of solution" }, { left: "m", right: "Total solution mass" }, { left: "Delta T", right: "T2 - T1" }], "The PDF explains each variable below the heat equation.");
  order(1, "Order the neutralization pattern from reactants to products.", ["Acid", "Base", "Salt", "Water"], "Neutralization follows acid plus base producing salt and water.");
  multi(1, "Which statements are correct for Experiment 1?", ["q = Cp * m * Delta T", "Delta H = -q", "Cp is about 4.18 J/g.C", "Delta T = T1 - T2", "Base gives H+"], ["q = Cp * m * Delta T", "Delta H = -q", "Cp is about 4.18 J/g.C"], "The correct statements match the listed formulas and constants; Delta T is T2 - T1, and acid gives H+.");
  fill(1, "In the sodium hydroxide example, NaOH + HCl produces NaCl and ____.", ["H2O", "water"], "H2O", "The source example is NaOH + HCl -> NaCl + H2O.");
  tf(1, "Combustion is one of the reaction types listed in the file.", true, "Combustion appears in the list of chemical reaction types.");
  tf(1, "Double replacement is not mentioned in the reaction type list.", false, "Double replacement is one of the listed reaction types.");

  mcq(2, "Which set contains only solution types listed in Experiment 2?", ["True, colloidal, suspended", "Acidic, basic, neutral", "Organic, inorganic, metallic", "Hot, cold, concentrated"], "True, colloidal, suspended", "The file lists true solutions, colloidal solutions, and suspended solutions.");
  mcq(2, "What does concentration express?", ["Amount of solute in a defined volume", "Only the color intensity of a liquid", "Mass of glassware used", "Temperature needed for dissolving"], "Amount of solute in a defined volume", "The source defines concentration as the amount of dissolved substance in a defined volume.");
  mcq(2, "What is molality?", ["Moles of solute per kilogram of solvent", "Moles of solute per liter of solution", "Grams of salt per 100 mL solution", "Volume of solvent per mole of solute"], "Moles of solute per kilogram of solvent", "Molality m is defined as solute moles in one kilogram of solvent.");
  mcq(2, "Which formula is listed for molality?", ["m = n / mass of solvent (kg)", "M = n / V_L", "q = Cp * m * Delta T", "Kf = W * 128 * Delta T / 1000"], "m = n / mass of solvent (kg)", "The Experiment 2 formula is m = n divided by solvent mass in kg.");
  mcq(2, "Which unit basis is used in molality?", ["Kilogram of solvent", "Liter of solution", "Gram of solute only", "Milliliter of total solution"], "Kilogram of solvent", "Molality depends on the mass of the solvent in kilograms.");
  mcq(2, "Which symbol is used for molality in the file?", ["m", "M", "q", "Kf"], "m", "The source uses lowercase m for molality.");
  mcq(2, "What notation is used for percentage concentration?", ["%", "Kf", "Cp", "V_L"], "%", "The file says percentage concentration is expressed with percent.");
  mcq(2, "Which units are named for very small concentrations?", ["ppm and ppb", "J/g.C and g/mL", "kg and L only", "T1 and T2"], "ppm and ppb", "The source mentions parts per million and parts per billion.");
  mcq(2, "Which expression means parts per million?", ["ppm", "ppb", "Cp", "M.wt"], "ppm", "ppm is parts per million.");
  mcq(2, "Which expression means parts per billion?", ["ppb", "ppm", "OH-", "T2"], "ppb", "ppb is parts per billion.");
  tf(2, "A true solution is one of the solution types listed.", true, "The listed types include true solutions.");
  tf(2, "A colloidal solution is one of the solution types listed.", true, "The source includes colloidal solutions.");
  tf(2, "A suspended solution is not part of the Experiment 2 list.", false, "Suspended solutions are explicitly listed.");
  tf(2, "Molality uses kilograms of solvent.", true, "The molality definition is moles of solute per kg of solvent.");
  tf(2, "Molality is calculated from liters of solution.", false, "That describes molarity, not molality. Experiment 2 uses mass of solvent in kg.");
  tf(2, "The symbol m in Experiment 2 is lowercase.", true, "The file uses lowercase m for molality.");
  tf(2, "Percentage concentration is expressed by ppm only.", false, "The file separately mentions percentage with % and very small concentrations with ppm or ppb.");
  tf(2, "Concentration can describe amount of solute in a defined volume.", true, "This matches the definition in the source.");
  fill(2, "Complete the molality equation: m = n / mass of solvent (____).", ["kg", "kilogram", "kilograms"], "kg", "The denominator is mass of solvent in kilograms.");
  fill(2, "The symbol for molality is lowercase ____.", ["m"], "m", "The file labels molality with lowercase m.");
  fill(2, "Parts per million is abbreviated ____.", ["ppm"], "ppm", "The source lists ppm for parts per million.");
  fill(2, "Parts per billion is abbreviated ____.", ["ppb"], "ppb", "The source lists ppb for parts per billion.");
  fill(2, "Percentage concentration is represented by the symbol ____.", ["%", "percent"], "%", "The file says percentage concentration is expressed by percent.");
  multi(2, "Select all solution types listed in the PDF.", ["true solution", "colloidal solution", "suspended solution", "electrolyte only", "neutralization solution"], ["true solution", "colloidal solution", "suspended solution"], "Experiment 2 lists true, colloidal, and suspended solutions.");
  matching(2, "Match each concentration notation to its meaning.", [{ left: "m", right: "Molality" }, { left: "%", right: "Percentage concentration" }, { left: "ppm", right: "Parts per million" }, { left: "ppb", right: "Parts per billion" }], "These notations are grouped in the concentration section.");
  matching(2, "Match each item to the correct role in molality.", [{ left: "n", right: "Moles of solute" }, { left: "mass of solvent", right: "Denominator in kg" }, { left: "m", right: "Molality" }, { left: "solute", right: "Dissolved substance" }], "The molality formula is m = n / mass of solvent in kilograms.");
  multi(2, "Which statements correctly separate molality from other measures?", ["Molality uses solvent mass", "Molality uses lowercase m", "Molality uses kg in the denominator", "Molality is M = n / V_L", "Molality is q = Cp * m * Delta T"], ["Molality uses solvent mass", "Molality uses lowercase m", "Molality uses kg in the denominator"], "Experiment 2 defines molality using moles over kg of solvent; M = n / V_L is Experiment 3 molarity.");
  order(2, "Order these concentration scales from larger-style percent notation to smaller trace notations.", ["%", "ppm", "ppb"], "The file lists percentage, then parts per million and parts per billion for very small concentrations.");
  mcq(2, "Which question should you ask to apply molality correctly?", ["How many moles of solute are in each kg of solvent?", "How much heat is released by the reaction?", "What is the freezing point of benzene?", "Which ion does an acid give?"], "How many moles of solute are in each kg of solvent?", "Molality is specifically based on solute moles per kg of solvent.");
  tf(2, "Experiment 2 introduces Kf for benzene.", false, "Kf belongs to Experiment 6, not the concentration experiment.");
  mcq(2, "Which option is a common wrong denominator for molality?", ["Liter of solution", "Kilogram of solvent", "Mass of solvent in kg", "Solvent mass"], "Liter of solution", "Liters of solution are used for molarity, while molality uses kg of solvent.");

  mcq(3, "What does molarity M mean?", ["Moles of solute in one liter of solution", "Moles of solute in one kilogram of solvent", "Heat needed to dissolve salt", "Mass of benzene in grams"], "Moles of solute in one liter of solution", "The file defines molarity as moles of solute in one liter of solution.");
  mcq(3, "Which formula is listed for molarity?", ["M = n / V_L", "m = n / mass of solvent (kg)", "q = Cp * m * Delta T", "Delta H = -q"], "M = n / V_L", "Experiment 3 gives M = n / V_L.");
  mcq(3, "What does n represent in the molarity equation?", ["Number of moles", "Volume in liters", "Specific heat", "Mass density"], "Number of moles", "The source states n is the number of moles.");
  mcq(3, "What does V_L represent?", ["Solution volume in liters", "Solvent mass in kg", "Heat quantity", "Molecular weight"], "Solution volume in liters", "The file defines V_L as solution volume in liters.");
  mcq(3, "How is the number of moles calculated from mass and molecular weight?", ["n = Mass / M.wt", "n = M.wt / Mass", "n = M * M.wt", "n = V_L / M"], "n = Mass / M.wt", "The PDF gives n = Mass / M.wt.");
  mcq(3, "Which symbol is used for molarity?", ["M", "m", "Cp", "W"], "M", "Experiment 3 uses uppercase M for molarity.");
  mcq(3, "Which variable must be in liters when calculating molarity?", ["V_L", "n", "M.wt", "Cp"], "V_L", "The volume term V_L is the solution volume in liters.");
  mcq(3, "Which rearrangement gives moles from molarity and volume?", ["n = M * V_L", "n = V_L / M", "n = M.wt / Mass", "n = M + V_L"], "n = M * V_L", "From M = n / V_L, multiplying both sides by V_L gives n = M * V_L.");
  mcq(3, "Which rearrangement gives solution volume?", ["V_L = n / M", "V_L = M / n", "V_L = Mass / M.wt", "V_L = q / Cp"], "V_L = n / M", "From M = n / V_L, volume equals n divided by M.");
  mcq(3, "Which formula belongs to Experiment 3 rather than Experiment 2?", ["M = n / V_L", "m = n / mass of solvent (kg)", "Delta H = -q", "Kf = W * 128 * Delta T / 1000"], "M = n / V_L", "Experiment 3 is about molarity, so the formula is M = n / V_L.");
  tf(3, "Molarity uses liters of solution.", true, "The source defines V_L as solution volume in liters.");
  tf(3, "Molarity uses kilograms of solvent.", false, "That is molality. Molarity uses liters of solution.");
  tf(3, "M and m mean the same thing in the lab file.", false, "Uppercase M is molarity; lowercase m is molality.");
  tf(3, "n is calculated by Mass divided by molecular weight.", true, "The file gives n = Mass / M.wt.");
  tf(3, "V_L means the mass of solute.", false, "V_L means the solution volume in liters.");
  tf(3, "M.wt is used in the mole calculation.", true, "The PDF shows n = Mass / M.wt.");
  tf(3, "To use M = n / V_L, volume should be converted to liters.", true, "The formula uses V_L, meaning volume in liters.");
  tf(3, "The molarity experiment is the sixth experiment.", false, "Molarity is Experiment 3.");
  fill(3, "Complete the molarity equation: M = n / ____.", ["V_L", "VL", "V"], "V_L", "The file gives M = n / V_L.");
  fill(3, "Complete the moles equation: n = Mass / ____.", ["M.wt", "mwt", "molecular weight"], "M.wt", "The PDF states n = Mass / M.wt.");
  fill(3, "Uppercase ____ is the symbol for molarity.", ["M"], "M", "Experiment 3 labels molarity as M.");
  fill(3, "The variable ____ means number of moles.", ["n"], "n", "The source identifies n as the number of moles.");
  fill(3, "V_L is solution volume in ____.", ["liters", "liter", "L"], "liters", "The file defines V_L as the solution volume in liters.");
  matching(3, "Match each molarity symbol to its meaning.", [{ left: "M", right: "Molarity" }, { left: "n", right: "Number of moles" }, { left: "V_L", right: "Volume of solution in liters" }, { left: "M.wt", right: "Molecular weight" }], "These are the symbols explained in Experiment 3.");
  multi(3, "Select all correct statements about molarity.", ["M = n / V_L", "V_L is in liters", "n = Mass / M.wt", "M uses kg of solvent", "M is the same as lowercase m"], ["M = n / V_L", "V_L is in liters", "n = Mass / M.wt"], "The source separates molarity from molality; molarity uses liters of solution.");
  order(3, "Order the steps to calculate molarity from mass, molecular weight, and volume.", ["Calculate n = Mass / M.wt", "Convert solution volume to liters", "Calculate M = n / V_L"], "Experiment 3 first defines n, then uses n and V_L in the molarity equation.");
  mcq(3, "If the volume is given in mL, what must happen before using M = n / V_L?", ["Convert mL to L", "Convert mL to kg", "Use Cp = 4.18", "Subtract T1 from T2"], "Convert mL to L", "V_L must be in liters.");
  mcq(3, "Which item is the denominator in the molarity formula?", ["V_L", "n", "Mass", "M"], "V_L", "Molarity is n divided by solution volume in liters.");
  tf(3, "n = M * V_L is consistent with the source formula.", true, "It is the rearranged form of M = n / V_L.");
  mcq(3, "Which trap most directly confuses Experiment 2 and Experiment 3?", ["Using kg of solvent for M", "Using V_L as liters", "Using n as moles", "Using Mass / M.wt"], "Using kg of solvent for M", "Kg of solvent belongs to molality, while molarity uses liters of solution.");

  mcq(4, "What is solubility?", ["Amount of solute in a defined volume of solvent", "Moles per liter of solution", "Heat released by neutralization", "Electrical flow due to ions"], "Amount of solute in a defined volume of solvent", "The file defines solubility as the amount of solute in a defined volume of solvent.");
  mcq(4, "What is dissolution temperature?", ["Temperature required to completely dissolve the solute", "Temperature at which benzene freezes", "Temperature change T2 - T1", "Temperature that always reduces solubility"], "Temperature required to completely dissolve the solute", "The source states it is the temperature needed for complete dissolution of the solute.");
  mcq(4, "Which unit is listed for solubility?", ["g/mL", "J/g.C", "mol/L", "ppm"], "g/mL", "The file lists the solubility unit as gram per milliliter.");
  mcq(4, "What is the relation between solute mass and required heat in Experiment 4?", ["Direct relationship", "Inverse relationship", "No relationship", "Only depends on Cp"], "Direct relationship", "The source says increasing solute mass requires a higher temperature to dissolve it.");
  mcq(4, "Which factor affects solubility according to the file?", ["Type of stirring used", "Color of the thermometer", "Shape of the label", "Number of pages in the manual"], "Type of stirring used", "The listed factors include the type of stirring used.");
  mcq(4, "Which list contains only factors affecting solubility from the source?", ["Temperature, solute amount, solvent amount, stirring type, solute type", "pH, voltage, density, color, pressure", "Mass, molecular weight, V_L, ppm, ppb", "T1, T2, W, 128, 1000"], "Temperature, solute amount, solvent amount, stirring type, solute type", "These five factors are listed in the solubility experiment.");
  mcq(4, "Which salt group needs the lowest heat according to the order in the file?", ["Organic salts", "Inorganic simple salts", "Inorganic complex salts", "All salts need equal heat"], "Organic salts", "The order from lowest to highest begins with organic salts.");
  mcq(4, "Which salt group needs the highest heat according to the order in the file?", ["Inorganic simple salts", "Organic salts", "Inorganic complex salts", "Colloidal salts"], "Inorganic simple salts", "The source order ends with inorganic simple salts as the highest.");
  mcq(4, "Which salt type is in the middle of the heat-need order?", ["Inorganic complex salts", "Organic salts", "Inorganic simple salts", "Suspended salts"], "Inorganic complex salts", "The file order is organic, inorganic complex, inorganic simple.");
  mcq(4, "If solute mass increases, what happens to the temperature required for dissolution?", ["It increases", "It decreases", "It becomes zero", "It changes to ppm"], "It increases", "The source describes a direct relationship between solute mass and required heat.");
  tf(4, "Solubility is the amount of solute in a defined volume of solvent.", true, "This matches the file definition.");
  tf(4, "Dissolution temperature is the temperature needed to dissolve the solute completely.", true, "The PDF defines it that way.");
  tf(4, "The solubility unit listed is J/g.C.", false, "J/g.C is Cp in Experiment 1; solubility is listed as g/mL.");
  tf(4, "Temperature is one of the factors affecting solubility.", true, "Temperature is listed among the solubility factors.");
  tf(4, "Solvent amount is one of the factors affecting solubility.", true, "The amount of solvent is one of the listed factors.");
  tf(4, "The type of solute does not affect solubility.", false, "The file lists type of solute as a factor.");
  tf(4, "The relation between solute mass and heat is inverse.", false, "The source says the relation is direct.");
  tf(4, "Organic salts are listed before inorganic complex salts in heat need.", true, "The order starts with organic salts, then inorganic complex salts.");
  fill(4, "The listed unit for solubility is ____.", ["g/mL", "g per mL", "gram per milliliter"], "g/mL", "The source gives the solubility unit as g/mL.");
  fill(4, "Dissolution temperature is needed to dissolve the solute ____.", ["completely", "fully"], "completely", "The file says it is the temperature required for complete dissolution.");
  fill(4, "The relationship between solute mass and heat is ____.", ["direct", "direct relationship"], "direct", "Increasing solute mass requires higher temperature.");
  fill(4, "The lowest heat-need salt group is ____ salts.", ["organic"], "organic", "The listed order from lowest to highest starts with organic salts.");
  fill(4, "The highest heat-need salt group is inorganic ____ salts.", ["simple"], "simple", "The order ends with inorganic simple salts.");
  multi(4, "Select all factors affecting solubility in Experiment 4.", ["temperature", "amount of solute", "amount of solvent", "type of stirring", "type of solute", "Cp value"], ["temperature", "amount of solute", "amount of solvent", "type of stirring", "type of solute"], "The source lists those five factors; Cp belongs to Experiment 1.");
  matching(4, "Match each solubility item to its meaning.", [{ left: "Solubility", right: "Amount of solute in defined solvent volume" }, { left: "Dissolution temperature", right: "Temperature for complete dissolution" }, { left: "g/mL", right: "Listed solubility unit" }, { left: "Direct relationship", right: "More solute needs more heat" }], "These definitions and notes are taken from Experiment 4.");
  order(4, "Order the salt groups by heat need from lowest to highest.", ["Organic salts", "Inorganic complex salts", "Inorganic simple salts"], "The file explicitly gives this order.");
  multi(4, "Which statements are correct about the solubility experiment?", ["More solute mass requires higher temperature", "The unit listed is g/mL", "Stirring type is a factor", "Inorganic simple salts need the least heat", "The relation is inverse"], ["More solute mass requires higher temperature", "The unit listed is g/mL", "Stirring type is a factor"], "The source says the relation is direct and the lowest heat group is organic salts.");
  mcq(4, "Which option is not a listed factor affecting solubility?", ["Acid gives H+", "Temperature", "Solvent amount", "Solute type"], "Acid gives H+", "Acid ion definition belongs to Experiment 1, not the solubility factor list.");
  tf(4, "Inorganic complex salts are listed between organic salts and inorganic simple salts.", true, "The salt order places inorganic complex salts in the middle.");
  mcq(4, "Which statement best distinguishes solubility from dissolution temperature?", ["Solubility is amount dissolved; dissolution temperature is heat level needed for complete dissolving", "Both mean molarity", "Both mean electrical conductivity", "Dissolution temperature is ppm"], "Solubility is amount dissolved; dissolution temperature is heat level needed for complete dissolving", "The source gives separate definitions for amount dissolved and temperature needed.");

  mcq(5, "What is an electrolyte solution?", ["A solution that conducts electricity because it contains freely moving ions", "A solution that never contains ions", "A solution that is always 5% NaCl", "A solution used only for freezing-point depression"], "A solution that conducts electricity because it contains freely moving ions", "The file defines an electrolyte solution by electrical conduction due to freely moving ions.");
  mcq(5, "What causes electrical conductivity in the listed electrolyte solution definition?", ["Freely moving ions", "Fixed glass particles", "Only neutral molecules", "Thermometer color"], "Freely moving ions", "The source says conductivity occurs because ions are free to move.");
  mcq(5, "What does 5% NaCl mean in the file?", ["5 g NaCl per 100 mL total solution", "5 g NaCl per 100 mL water only", "95 g NaCl per 5 mL water", "5 mol NaCl per kg solvent"], "5 g NaCl per 100 mL total solution", "The PDF states 5% NaCl means 5 g salt for each 100 mL of total solution.");
  mcq(5, "How can 5% NaCl be prepared according to the alternate wording?", ["Add 5 g salt to 95 mL water", "Add 95 g salt to 5 mL water", "Add 5 g salt to 100 mL water", "Add 5 mol salt to 1 kg solvent"], "Add 5 g salt to 95 mL water", "The source gives the alternate preparation as 5 g salt added to 95 mL water/solvent.");
  mcq(5, "What is the temperature-conductivity relationship in this experiment context?", ["Inverse", "Direct", "No relationship", "Always neutral"], "Inverse", "The file states the relationship is inverse in this experiment.");
  mcq(5, "Why does higher temperature reduce conductivity in the file's explanation?", ["It increases solvent evaporation, affecting ion movement", "It turns ions into electrons", "It changes NaCl into benzene", "It removes all salt instantly"], "It increases solvent evaporation, affecting ion movement", "The source connects higher temperature with more solvent evaporation, affected ion movement, and reduced conductivity.");
  mcq(5, "Which particle movement is important for conductivity?", ["Ion movement", "Page movement", "Glass movement", "Only proton movement in acids"], "Ion movement", "The file's definition depends on freely moving ions.");
  mcq(5, "In 5% NaCl, what mass of NaCl corresponds to 100 mL total solution?", ["5 g", "95 g", "100 g", "10 mL"], "5 g", "The source states 5 g NaCl per 100 mL total solution.");
  mcq(5, "In the alternate 5% NaCl preparation, how much water is used with 5 g salt?", ["95 mL", "100 mL", "5 mL", "10 mL"], "95 mL", "The file gives 5 g salt plus 95 mL water.");
  mcq(5, "Which statement is the best warning for this experiment?", ["Do not assume higher temperature always increases conductivity", "Do not use ions when explaining conductivity", "5% NaCl means 5 g in 5 mL total solution", "Conductivity is caused by molecular weight"], "Do not assume higher temperature always increases conductivity", "The PDF specifically states an inverse relationship here due to evaporation and ion movement effects.");
  tf(5, "Electrolyte solutions conduct because ions can move freely.", true, "This is exactly the source definition.");
  tf(5, "5% NaCl means 5 g NaCl in every 100 mL total solution.", true, "The file states 5 g salt corresponds to 100 mL total solution.");
  tf(5, "The alternate 5% NaCl preparation uses 5 g salt and 95 mL water.", true, "The PDF gives that preparation.");
  tf(5, "Temperature and conductivity are direct in this experiment.", false, "The source says the relationship is inverse.");
  tf(5, "Higher temperature increases solvent evaporation in the file's explanation.", true, "The reason section says increasing temperature increases solvent evaporation.");
  tf(5, "Conductivity in this experiment is explained by freely moving electrons in the solution.", false, "The source explanation uses freely moving ions, not electrons.");
  tf(5, "Solvent evaporation can affect ion movement and reduce conductivity.", true, "That is the stated reason for the inverse relationship.");
  tf(5, "NaCl percentage concentration is explained in Experiment 5.", true, "The file explains the meaning of 5% NaCl in this experiment.");
  fill(5, "An electrolyte solution conducts because it contains freely moving ____.", ["ions", "ion"], "ions", "The source definition depends on freely moving ions.");
  fill(5, "A 5% NaCl solution has ____ g NaCl per 100 mL total solution.", ["5", "5 g"], "5 g", "The file states 5 g NaCl per 100 mL total solution.");
  fill(5, "The alternate preparation adds 5 g NaCl to ____ mL water.", ["95", "95 mL"], "95 mL", "The PDF gives 95 mL water/solvent with 5 g salt.");
  fill(5, "The temperature-conductivity relationship in this experiment is ____.", ["inverse", "opposite"], "inverse", "The source says the relation is inverse.");
  fill(5, "Higher temperature increases solvent ____.", ["evaporation"], "evaporation", "The reason in the file is increased solvent evaporation.");
  matching(5, "Match each conductivity item to its source meaning.", [{ left: "Electrolyte solution", right: "Conducts due to moving ions" }, { left: "5% NaCl", right: "5 g per 100 mL total solution" }, { left: "Alternate prep", right: "5 g salt plus 95 mL water" }, { left: "Temperature relation", right: "Inverse in this experiment" }], "These points are all stated in Experiment 5.");
  multi(5, "Select all correct statements about 5% NaCl.", ["5 g NaCl per 100 mL total solution", "5 g salt plus 95 mL water is an alternate wording", "It is explained in Experiment 5", "It means 5 g salt in 100 mL water only", "It means 95 g salt"], ["5 g NaCl per 100 mL total solution", "5 g salt plus 95 mL water is an alternate wording", "It is explained in Experiment 5"], "The source emphasizes total solution volume and the 95 mL water alternate preparation.");
  multi(5, "Which statements explain conductivity according to the file?", ["Free ion movement allows conduction", "Higher temperature can increase evaporation", "Evaporation affects ion movement", "Electrons in glassware conduct the solution", "Conductivity ignores ions"], ["Free ion movement allows conduction", "Higher temperature can increase evaporation", "Evaporation affects ion movement"], "The definition and reason both center ion movement and solvent evaporation.");
  order(5, "Order the file's explanation for why higher temperature lowers conductivity.", ["Temperature increases", "Solvent evaporation increases", "Ion movement is affected", "Electrical conductivity decreases"], "This follows the source reason: higher temperature causes more evaporation, which affects ion movement and reduces conductivity.");
  mcq(5, "Which value describes total solution volume in the 5% NaCl explanation?", ["100 mL", "95 mL", "5 mL", "1 L"], "100 mL", "The primary definition is 5 g NaCl for each 100 mL total solution.");
  tf(5, "The file says 5% NaCl is 5 g NaCl plus 95 mL solvent as another wording.", true, "That alternate wording appears in the source.");
  mcq(5, "Which answer best distinguishes an electrolyte solution from a nonelectrolyte?", ["Presence of freely moving ions", "Having the symbol Kf", "Using benzene", "Having organic salts only"], "Presence of freely moving ions", "The definition of electrolyte solution is based on freely moving ions that allow electrical conduction.");

  mcq(6, "What does Experiment 6 calculate?", ["The molal freezing-point constant of benzene, Kf", "The molarity of NaCl", "The heat of neutralization", "The solubility of organic salts"], "The molal freezing-point constant of benzene, Kf", "The source says the experiment calculates benzene's molal freezing-point constant Kf.");
  mcq(6, "Which formula is given for Kf?", ["Kf = (W * 128 * Delta T) / 1000", "Kf = n / V_L", "Kf = Cp * m * Delta T", "Kf = Mass / M.wt"], "Kf = (W * 128 * Delta T) / 1000", "The PDF lists Kf = W * 128 * Delta T divided by 1000.");
  mcq(6, "What does W represent in the Kf formula?", ["Mass of benzene", "Volume of solution in liters", "Mass of naphthalene only", "Specific heat"], "Mass of benzene", "The source defines W as the mass of benzene.");
  mcq(6, "What volume of benzene is noted before measuring its mass?", ["10 mL", "20 mL", "95 mL", "100 mL"], "10 mL", "The PDF notes taking 10 mL benzene and then measuring its mass.");
  mcq(6, "How is Delta T defined in Experiment 6?", ["T2 - T1", "T1 - T2", "T1 + T2", "W - 128"], "T2 - T1", "The source defines Delta T as T2 - T1.");
  mcq(6, "What is T1?", ["Freezing point of pure benzene", "Freezing point of benzene plus naphthalene", "Mass of benzene", "Acetone formula"], "Freezing point of pure benzene", "Experiment 6 defines T1 as the freezing point of pure benzene.");
  mcq(6, "What is T2?", ["Freezing point of the benzene + naphthalene solution", "Freezing point of pure benzene", "Mass of benzene", "Moles of NaCl"], "Freezing point of the benzene + naphthalene solution", "The file defines T2 as the solution freezing point, benzene plus naphthalene.");
  mcq(6, "What is the formula for benzene?", ["C6H6", "C10H8", "CH3COCH3", "NaCl"], "C6H6", "The formulas-to-memorize section lists benzene as C6H6.");
  mcq(6, "What is the formula for naphthalene?", ["C10H8", "C6H6", "CH3COCH3", "KNO3"], "C10H8", "The source lists naphthalene as C10H8.");
  mcq(6, "What is the formula for acetone?", ["CH3COCH3", "C6H6", "C10H8", "H2O"], "CH3COCH3", "The source lists acetone as CH3COCH3.");
  tf(6, "Experiment 6 calculates Kf for benzene.", true, "The PDF states that benzene's molal freezing-point constant is calculated.");
  tf(6, "W is the volume of benzene.", false, "The source defines W as benzene mass; it only notes that 10 mL is taken before measuring mass.");
  tf(6, "Delta T is T2 - T1.", true, "The file defines Delta T as T2 - T1.");
  tf(6, "T1 is the freezing point of the benzene + naphthalene solution.", false, "T1 is pure benzene; T2 is the solution.");
  tf(6, "T2 is the freezing point of benzene plus naphthalene.", true, "The source defines T2 as the solution freezing point.");
  tf(6, "The Kf equation includes the factor 128.", true, "The formula in the source includes 128.");
  tf(6, "The Kf equation is divided by 1000.", true, "The file shows division by 1000.");
  tf(6, "Benzene is C10H8 in the formulas list.", false, "Benzene is C6H6; naphthalene is C10H8.");
  fill(6, "Complete the Kf formula: Kf = (W * 128 * Delta T) / ____.", ["1000", "1,000"], "1000", "The source formula divides by 1000.");
  fill(6, "In Experiment 6, W is the mass of ____.", ["benzene"], "benzene", "The PDF defines W as benzene mass.");
  fill(6, "The volume of benzene taken before measuring mass is ____ mL.", ["10", "10 mL"], "10 mL", "The file notes taking 10 mL benzene.");
  fill(6, "T1 is the freezing point of pure ____.", ["benzene"], "benzene", "The source defines T1 as pure benzene's freezing point.");
  fill(6, "T2 is the freezing point of benzene plus ____.", ["naphthalene"], "naphthalene", "The file defines T2 as benzene + naphthalene solution.");
  fill(6, "Benzene has the formula ____.", ["C6H6"], "C6H6", "The formulas section lists benzene as C6H6.");
  fill(6, "Naphthalene has the formula ____.", ["C10H8"], "C10H8", "The formulas section lists naphthalene as C10H8.");
  fill(6, "Acetone has the formula ____.", ["CH3COCH3"], "CH3COCH3", "The formulas section lists acetone as CH3COCH3.");
  matching(6, "Match each Experiment 6 variable to its meaning.", [{ left: "Kf", right: "Molal freezing-point constant of benzene" }, { left: "W", right: "Mass of benzene" }, { left: "T1", right: "Freezing point of pure benzene" }, { left: "T2", right: "Freezing point of benzene + naphthalene" }], "These definitions are stated under the Kf equation.");
  matching(6, "Match each compound to its formula.", [{ left: "Benzene", right: "C6H6" }, { left: "Naphthalene", right: "C10H8" }, { left: "Acetone", right: "CH3COCH3" }], "The file lists these chemical formulas for memorization.");
  order(6, "Order the temperature terms used to calculate Delta T.", ["T1: pure benzene freezing point", "T2: solution freezing point", "Delta T = T2 - T1"], "The source defines T1 and T2, then Delta T as T2 - T1.");
  multi(6, "Select all correct components of the Kf formula.", ["W", "128", "Delta T", "division by 1000", "Cp = 4.18"], ["W", "128", "Delta T", "division by 1000"], "The Kf formula uses W, 128, Delta T, and division by 1000; Cp belongs to Experiment 1.");
  mcq(6, "Which trap reverses the source definitions of T1 and T2?", ["Saying T1 is solution and T2 is pure benzene", "Saying T1 is pure benzene and T2 is solution", "Using C6H6 for benzene", "Including 128 in Kf"], "Saying T1 is solution and T2 is pure benzene", "The file defines T1 as pure benzene and T2 as benzene plus naphthalene solution.");

  const flashcards = [
    { exp: 1, front: "What does thermochemistry study?", back: "Heat or thermal energy changes that accompany chemical reactions.", note: "This is the opening definition for Experiment 1." },
    { exp: 1, front: "Neutralization pattern", back: "Acid + base -> salt + water.", note: "The PDF defines neutralization this way and gives NaOH/HCl and KOH/HNO3 examples." },
    { exp: 1, front: "Acid vs base ions", back: "Acid gives H+. Base gives OH-.", note: "This is the main trap in the first experiment." },
    { exp: 1, front: "Heat equation", back: "q = Cp * m * Delta T.", note: "Cp is approximately 4.18 J/g.C for the solution." },
    { exp: 1, front: "Temperature change", back: "Delta T = T2 - T1.", note: "Do not reverse it." },
    { exp: 1, front: "Heat and enthalpy relationship", back: "Delta H = -q.", note: "The sign of Delta H is opposite to q." },
    { exp: 2, front: "Three solution types", back: "True, colloidal, and suspended solutions.", note: "These are the types listed in Experiment 2." },
    { exp: 2, front: "Concentration meaning", back: "Amount of solute in a defined volume.", note: "The source phrases it as amount of dissolved material in a specified volume." },
    { exp: 2, front: "Molality definition", back: "Moles of solute per kilogram of solvent.", note: "Molality uses solvent mass, not solution volume." },
    { exp: 2, front: "Molality formula", back: "m = n / mass of solvent (kg).", note: "Lowercase m means molality." },
    { exp: 2, front: "Small concentration units", back: "ppm and ppb.", note: "The file also lists percentage concentration using %." },
    { exp: 2, front: "Molality trap", back: "Do not use liters of solution for molality.", note: "Liters of solution belong to molarity in Experiment 3." },
    { exp: 3, front: "Molarity definition", back: "Moles of solute in one liter of solution.", note: "Uppercase M means molarity." },
    { exp: 3, front: "Molarity formula", back: "M = n / V_L.", note: "V_L is solution volume in liters." },
    { exp: 3, front: "Moles from mass", back: "n = Mass / M.wt.", note: "This is the mole equation listed in the PDF." },
    { exp: 3, front: "Volume unit for molarity", back: "Liters.", note: "Convert mL to L before using M = n / V_L." },
    { exp: 3, front: "M vs m", back: "M is molarity; m is molality.", note: "The capital letter matters." },
    { exp: 3, front: "Rearranged molarity", back: "n = M * V_L and V_L = n / M.", note: "These follow from the listed formula." },
    { exp: 4, front: "Solubility definition", back: "Amount of solute in a defined volume of solvent.", note: "This is the Experiment 4 definition." },
    { exp: 4, front: "Dissolution temperature", back: "Temperature needed to completely dissolve the solute.", note: "The file uses salt as the example solute." },
    { exp: 4, front: "Factors affecting solubility", back: "Temperature, solute amount, solvent amount, stirring type, and solute type.", note: "All five are listed in the PDF." },
    { exp: 4, front: "Solute mass and heat relation", back: "Direct relationship.", note: "More solute mass requires higher temperature." },
    { exp: 4, front: "Solubility unit", back: "g/mL.", note: "This is the unit listed in the summary." },
    { exp: 4, front: "Salt heat-need order", back: "Organic salts -> inorganic complex salts -> inorganic simple salts.", note: "This order is from lowest to highest heat need." },
    { exp: 5, front: "Electrolyte solution", back: "A solution that conducts electricity because it contains freely moving ions.", note: "Conductivity is explained by ions, not electrons." },
    { exp: 5, front: "5% NaCl meaning", back: "5 g NaCl per 100 mL total solution.", note: "Total solution volume is the important wording." },
    { exp: 5, front: "Alternate 5% NaCl preparation", back: "Add 5 g salt to 95 mL water.", note: "This is the second wording in the PDF." },
    { exp: 5, front: "Temperature and conductivity relation", back: "Inverse in this experiment.", note: "The file specifically says inverse in this context." },
    { exp: 5, front: "Why higher temperature lowers conductivity here", back: "It increases solvent evaporation, affecting ion movement.", note: "That reduces electrical conductivity according to the file." },
    { exp: 5, front: "Conductivity source", back: "Freely moving ions.", note: "This is the key definition to remember." },
    { exp: 6, front: "Experiment 6 goal", back: "Calculate benzene's molal freezing-point constant, Kf.", note: "Kf is for benzene in this experiment." },
    { exp: 6, front: "Kf formula", back: "Kf = (W * 128 * Delta T) / 1000.", note: "The 128 and 1000 are part of the source formula." },
    { exp: 6, front: "W meaning", back: "Mass of benzene.", note: "The file notes taking 10 mL benzene, then measuring its mass." },
    { exp: 6, front: "T1 and T2", back: "T1 is pure benzene freezing point; T2 is benzene + naphthalene solution freezing point.", note: "Do not reverse them." },
    { exp: 6, front: "Delta T", back: "Delta T = T2 - T1.", note: "Same direction as stated in the PDF." },
    { exp: 6, front: "Formulas to memorize", back: "Benzene C6H6, naphthalene C10H8, acetone CH3COCH3.", note: "These appear at the end of the file." },
  ];

  const formulaQuestions = [
    { id: "calc-1-01", exp: 1, concept: "q = Cp * m * Delta T", prompt: "A solution has Cp = 4.18 J/g.C, mass = 40 g, and Delta T = 5 C. Calculate q.", answer: 836, unit: "J", tolerance: 0.1, work: "q = 4.18 * 40 * 5 = 836 J.", explanation: "Experiment 1 gives q = Cp * m * Delta T." },
    { id: "calc-1-02", exp: 1, concept: "Delta H = -q", prompt: "If q = 836 J for a reaction, calculate Delta H.", answer: -836, unit: "J", tolerance: 0.1, work: "Delta H = -q = -836 J.", explanation: "The PDF states Delta H = -q, so the sign flips." },
    { id: "calc-1-03", exp: 1, concept: "Delta T = T2 - T1", prompt: "If T1 = 24 C and T2 = 31 C, calculate Delta T.", answer: 7, unit: "C", tolerance: 0.01, work: "Delta T = 31 - 24 = 7 C.", explanation: "Experiment 1 defines Delta T as T2 - T1." },
    { id: "calc-1-04", exp: 1, concept: "m = V * d", prompt: "If total volume V = 40 mL and density d = 1 g/mL, calculate total solution mass m.", answer: 40, unit: "g", tolerance: 0.01, work: "m = V * d = 40 * 1 = 40 g.", explanation: "The source says total solution mass is calculated by m = V * d." },
    { id: "calc-2-01", exp: 2, concept: "molality", prompt: "A solution has 0.50 mol solute in 0.25 kg solvent. Calculate molality m.", answer: 2, unit: "mol/kg", tolerance: 0.01, work: "m = n / kg solvent = 0.50 / 0.25 = 2 mol/kg.", explanation: "Experiment 2 defines molality as moles of solute per kilogram of solvent." },
    { id: "calc-2-02", exp: 2, concept: "molality", prompt: "A solution has 1.2 mol solute in 0.60 kg solvent. Calculate molality m.", answer: 2, unit: "mol/kg", tolerance: 0.01, work: "m = 1.2 / 0.60 = 2 mol/kg.", explanation: "Use mass of solvent in kg, not liters of solution." },
    { id: "calc-2-03", exp: 2, concept: "molality", prompt: "If molality is 3 m and solvent mass is 0.50 kg, calculate moles of solute n.", answer: 1.5, unit: "mol", tolerance: 0.01, work: "n = m * kg solvent = 3 * 0.50 = 1.5 mol.", explanation: "This rearranges m = n / mass of solvent (kg)." },
    { id: "calc-3-01", exp: 3, concept: "M = n / V_L", prompt: "A solution contains 0.25 mol solute in 0.50 L solution. Calculate molarity M.", answer: 0.5, unit: "M", tolerance: 0.01, work: "M = n / V_L = 0.25 / 0.50 = 0.50 M.", explanation: "Experiment 3 defines molarity as moles per liter of solution." },
    { id: "calc-3-02", exp: 3, concept: "n = Mass / M.wt", prompt: "A sample has mass = 10 g and molecular weight = 50 g/mol. Calculate n.", answer: 0.2, unit: "mol", tolerance: 0.01, work: "n = Mass / M.wt = 10 / 50 = 0.20 mol.", explanation: "The source gives n = Mass / M.wt." },
    { id: "calc-3-03", exp: 3, concept: "M = n / V_L", prompt: "A solution has 0.10 mol solute in 250 mL solution. Calculate molarity M.", answer: 0.4, unit: "M", tolerance: 0.01, work: "250 mL = 0.250 L, so M = 0.10 / 0.250 = 0.40 M.", explanation: "V_L must be in liters before using M = n / V_L." },
    { id: "calc-3-04", exp: 3, concept: "n = M * V_L", prompt: "A 0.80 M solution has volume 0.25 L. Calculate moles n.", answer: 0.2, unit: "mol", tolerance: 0.01, work: "n = M * V_L = 0.80 * 0.25 = 0.20 mol.", explanation: "This rearranges the source formula M = n / V_L." },
    { id: "calc-3-05", exp: 3, concept: "V_L = n / M", prompt: "A solution contains 0.30 mol solute and has molarity 0.60 M. Calculate V_L.", answer: 0.5, unit: "L", tolerance: 0.01, work: "V_L = n / M = 0.30 / 0.60 = 0.50 L.", explanation: "This is the volume rearrangement of M = n / V_L." },
    { id: "calc-4-01", exp: 4, concept: "solubility unit g/mL", prompt: "If 12 g solute dissolves in 24 mL solvent, calculate solubility in g/mL.", answer: 0.5, unit: "g/mL", tolerance: 0.01, work: "solubility = 12 / 24 = 0.50 g/mL.", explanation: "Experiment 4 lists solubility as amount of solute in a defined solvent volume, with unit g/mL." },
    { id: "calc-4-02", exp: 4, concept: "solubility unit g/mL", prompt: "If solubility is 0.25 g/mL and solvent volume is 40 mL, calculate solute mass.", answer: 10, unit: "g", tolerance: 0.01, work: "solute mass = 0.25 * 40 = 10 g.", explanation: "This applies the source unit g/mL as grams per milliliter." },
    { id: "calc-4-03", exp: 4, concept: "direct heat relation", prompt: "A salt sample needs 30 C to dissolve 5 g. If the same trend is direct, what temperature would match 10 g in this simple proportional drill?", answer: 60, unit: "C", tolerance: 0.01, work: "10 g is double 5 g, so the proportional temperature is 60 C.", explanation: "The source says solute mass and required heat have a direct relationship." },
    { id: "calc-5-01", exp: 5, concept: "5% NaCl", prompt: "For 200 mL total solution, how many grams NaCl are needed for a 5% NaCl solution?", answer: 10, unit: "g", tolerance: 0.01, work: "5 g per 100 mL, so 200 mL needs 10 g.", explanation: "Experiment 5 says 5% NaCl means 5 g NaCl per 100 mL total solution." },
    { id: "calc-5-02", exp: 5, concept: "5% NaCl", prompt: "If you use 15 g NaCl for a 5% NaCl solution, what total solution volume does that match?", answer: 300, unit: "mL", tolerance: 0.01, work: "5 g matches 100 mL, so 15 g matches 300 mL.", explanation: "The source ratio is 5 g NaCl per 100 mL total solution." },
    { id: "calc-5-03", exp: 5, concept: "5% NaCl preparation", prompt: "To prepare 100 mL of 5% NaCl using the alternate wording, how many mL water are paired with 5 g salt?", answer: 95, unit: "mL", tolerance: 0.01, work: "The PDF gives 5 g salt plus 95 mL water.", explanation: "This preserves the file's alternate preparation wording." },
    { id: "calc-6-01", exp: 6, concept: "Kf formula", prompt: "Using Kf = (W * 128 * Delta T) / 1000, calculate Kf when W = 10 g and Delta T = 2 C.", answer: 2.56, unit: "", tolerance: 0.01, work: "Kf = (10 * 128 * 2) / 1000 = 2.56.", explanation: "Experiment 6 gives Kf = (W * 128 * Delta T) / 1000." },
    { id: "calc-6-02", exp: 6, concept: "Delta T = T2 - T1", prompt: "If T1 = 5.0 C and T2 = 7.5 C, calculate Delta T.", answer: 2.5, unit: "C", tolerance: 0.01, work: "Delta T = T2 - T1 = 7.5 - 5.0 = 2.5 C.", explanation: "The source defines Delta T as T2 - T1." },
    { id: "calc-6-03", exp: 6, concept: "Kf formula", prompt: "Calculate Kf when W = 8 g and Delta T = 3 C.", answer: 3.072, unit: "", tolerance: 0.001, work: "Kf = (8 * 128 * 3) / 1000 = 3.072.", explanation: "Use the exact Kf formula from Experiment 6." },
    { id: "calc-6-04", exp: 6, concept: "W is benzene mass", prompt: "If Kf = 2.56 and Delta T = 2 C, calculate W from Kf = (W * 128 * Delta T) / 1000.", answer: 10, unit: "g", tolerance: 0.01, work: "W = (Kf * 1000) / (128 * Delta T) = 2.56 * 1000 / 256 = 10 g.", explanation: "W is the benzene mass in the source formula." },
  ];

  window.CHEM202_DATA = { experiments, questions, flashcards, formulaQuestions };
})();
