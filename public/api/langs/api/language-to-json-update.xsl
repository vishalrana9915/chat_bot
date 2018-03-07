<?xml version="1.0" encoding="UTF-8"?>
<!-- edited with XMLSpy v2010 rel. 3 sp1 (x64) (http://www.altova.com) by Shawn S Miller (private) -->
<!-- Description: Used with Grunt XSLTProc Task to transform into individual JSON files-->
<xsl:stylesheet id="xslLangTransformToJson" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output omit-xml-declaration="no" indent="yes" method="text" encoding="ISO 8859-1"/>

  <xsl:strip-space elements="*"/>

  <xsl:param name="lang">en</xsl:param>

  <xsl:template match="/*">
    <xsl:text>{&#10;</xsl:text>
    <xsl:apply-templates select="key"/>
    <xsl:text>&#10;}</xsl:text>
  </xsl:template>

  <xsl:template match="key">
    <xsl:variable name="vPos" select="position()"/>
    <xsl:if test="$vPos &gt; 1">,&#10;</xsl:if>
    <xsl:text>"</xsl:text>
    <xsl:value-of select="@value"/>
    <xsl:text>" : "</xsl:text>

    <!--
      PREVIOUS CODE FOR MAPPING VALUE
      <xsl:apply-templates select="language[@value = $lang]"/>
    -->

    <xsl:choose>
      <!-- If the translated local value exists, use it -->
      <xsl:when test='string-length(language[@value = $lang]) > 0'>
        <xsl:apply-templates select="language[@value = $lang]"/>
      </xsl:when>

      <!-- If the locale starts with 'en' and there is no value, then use the 'us' value -->
      <xsl:when test='starts-with($lang, "en")'>
        <xsl:apply-templates select="language[@value = 'en']"/>
      </xsl:when>

      <!-- Otherwise, use the 'us' value with the Locale prefixed (Uppercase)
      '*' is prefixed to show that this was a calculated valued -->
      <xsl:otherwise>
        <xsl:text>*(</xsl:text>
        <xsl:value-of select="translate($lang,
                                'abcdefghijklmnopqrstuvwxyz',
                                'ABCDEFGHIJKLMNOPQRSTUVWXYZ')" />

        <xsl:text>)</xsl:text>
        <xsl:apply-templates select="language[@value = 'en']"/>
      </xsl:otherwise>
    </xsl:choose>

    <xsl:text>"</xsl:text>
  </xsl:template>

  <xsl:template match="language/@value">
    <xsl:value-of select="concat('&quot;', ., '&quot;')"/>
  </xsl:template>

</xsl:stylesheet>
